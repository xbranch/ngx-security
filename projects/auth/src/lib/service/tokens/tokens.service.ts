import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable, of, Subject, throwError } from 'rxjs';
import { finalize, map, mergeMap, skipUntil, take, tap } from 'rxjs/operators';

import { TokensServiceOptions } from './tokens-service-options';
import { SessionStorageUtil } from '../../util/session-storage.util';
import { LocaleStorageUtil } from '../../util/locale-storage.util';
import { JwtUtil } from '../../util/jwt.util';
import { AuthToken } from './auth-token';

@Injectable()
export class TokensService implements OnDestroy {

  private static ACCESS_TOKEN_STORAGE_KEY = 'access_token';
  private static REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

  private accessToken: BehaviorSubject<string> = new BehaviorSubject(SessionStorageUtil.get(TokensService.ACCESS_TOKEN_STORAGE_KEY));
  private refreshToken: BehaviorSubject<string> = new BehaviorSubject(LocaleStorageUtil.get(TokensService.REFRESH_TOKEN_STORAGE_KEY));
  private accessTokenPending: Subject<void> = null;

  accessToken$: Observable<string> = this.accessToken.asObservable();
  refreshToken$: Observable<string> = this.refreshToken.asObservable();

  constructor(private http: HttpClient, private options: TokensServiceOptions = new TokensServiceOptions()) {
  }

  ngOnDestroy(): void {
    if (this.accessTokenPending) {
      this.accessTokenPending.complete();
    }
    this.accessToken.complete();
    this.refreshToken.complete();
  }

  /**
   * Save access token to session storage and update current access token state.
   *
   * @param token: access token
   */
  setAccessToken(token: string): void {
    SessionStorageUtil.put(TokensService.ACCESS_TOKEN_STORAGE_KEY, token);
    this.accessToken.next(token);
  }

  /**
   * Save refresh token to local storage and update current refresh token state.
   *
   * @param token: refresh token
   */
  setRefreshToken(token: string): void {
    LocaleStorageUtil.put(TokensService.REFRESH_TOKEN_STORAGE_KEY, token);
    this.refreshToken.next(token);
  }

  /**
   * Save access token and refresh token with {@link setAccessToken} and {@link setRefreshToken}.
   *
   * @param accessToken
   * @param refreshToken
   */
  setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  /**
   * Get current access token.
   */
  getAccessToken(): string {
    return this.accessToken.getValue();
  }

  /**
   * Get current refresh token.
   */
  getRefreshToken(): string {
    return this.refreshToken.getValue();
  }

  /**
   * Return true if current access token exists and it is not expired yet.
   *
   * @param offsetSeconds: offset from expiration date
   */
  hasValidAccessToken(offsetSeconds?: number): boolean {
    const token = this.getAccessToken();
    return token && !JwtUtil.isTokenExpired(token, offsetSeconds);
  }

  /**
   * Return true if current refresh token exists and it is not expired yet.
   *
   * @param offsetSeconds: offset from expiration date
   */
  hasValidRefreshToken(offsetSeconds?: number): boolean {
    const token = this.getRefreshToken();
    return token && !JwtUtil.isTokenExpired(token, offsetSeconds);
  }

  /**
   * Return a valid access token or raise exception if token cannot be obtained. If access token is expired and a valid refresh token exists
   * we will fetch new access token.
   */
  getValidAccessToken(): Observable<string> {
    if (this.accessTokenPending && !this.accessTokenPending.isStopped) {
      return this.accessToken$.pipe(skipUntil(this.accessTokenPending), take(1));
    }

    this.accessTokenPending = new Subject();

    return combineLatest([this.accessToken$, this.refreshToken$]).pipe(
      take(1),
      mergeMap(([accessToken, refreshToken]) => {
        if (!accessToken && !refreshToken) {
          return throwError({message: 'Authentication token is missing'});
        }

        if (accessToken) {
          if (JwtUtil.isTokenExpired(accessToken)) {

            if (!refreshToken) {
              return throwError({message: 'Access token expired', details: 'No refresh token to obtain new access token'});
            }

            if (JwtUtil.isTokenExpired(refreshToken)) {
              return throwError({message: 'Refresh token expired', details: 'Cannot obtain new access token'});
            }

            // obtain new access token
            return this.refreshTokens(refreshToken).pipe(map(token => token.access_token));
          }
          // make a call
          return of(accessToken);
        }

        if (JwtUtil.isTokenExpired(refreshToken)) {
          return throwError({message: 'Access token is missing', details: 'Refresh token expired - cannot obtain new access token'});
        } else {
          // obtain new access token
          return this.refreshTokens(refreshToken).pipe(map(token => token.access_token));
        }
      }),
      finalize(() => this.accessTokenPending.complete())
    );
  }

  /**
   * Refresh access token via refresh_token oAuth2 grant type.
   *
   * @param refreshToken: a valid refresh token
   * @param params: additional parameters
   * @param headers: additional parameters
   */
  refreshTokens(refreshToken: string, params: HttpParams = new HttpParams(),
                headers: HttpHeaders = new HttpHeaders()): Observable<AuthToken> {
    params = (params || new HttpParams())
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    headers = (headers || new HttpHeaders())
      .set('Content-Type', 'application/x-www-form-urlencoded');

    if (!this.options.tokenUrl) {
      throwError({message: 'Refresh token not supported'});
    }

    if (this.options.clientSecret && this.options.useHttpBasicAuth) {
      headers = headers.set('Authorization', 'Basic ' + btoa(`${this.options.clientId}:${this.options.clientSecret}`));
    }

    return this.http.post<AuthToken>(this.options.tokenUrl, params, {headers}).pipe(
      tap(token => this.setTokens(token.access_token, token.refresh_token))
    );
  }

  /**
   * Fetch access token and refresh token via authorization_code oAuth2 grant type.
   *
   * @param code: a valid code form authorization code flow redirection
   * @param params: additional parameters
   * @param headers: additional parameters
   */
  fetchTokens(code: string, params: HttpParams = new HttpParams(), headers: HttpHeaders = new HttpHeaders()): Observable<AuthToken> {
    params = (params || new HttpParams())
      .set('grant_type', 'authorization_code')
      .set('code', code);

    headers = (headers || new HttpHeaders())
      .set('Content-Type', 'application/x-www-form-urlencoded');

    if (this.options.useHttpBasicAuth) {
      headers = headers.set('Authorization', 'Basic ' + btoa(`${this.options.clientId}:${this.options.clientSecret}`));
    } else {
      params = params.set('client_id', this.options.clientId);

      if (this.options.clientSecret) {
        params = params.set('client_secret', this.options.clientSecret);
      }
    }

    return this.http.post<AuthToken>(this.options.tokenUrl, params, {headers}).pipe(
      tap(token => this.setTokens(token.access_token, token.refresh_token))
    );
  }

  /**
   * Clear token state. Remove from session-storage and local-storage too.
   */
  clear(): void {
    this.accessToken.next(null);
    SessionStorageUtil.remove(TokensService.ACCESS_TOKEN_STORAGE_KEY);
    this.refreshToken.next(null);
    LocaleStorageUtil.remove(TokensService.REFRESH_TOKEN_STORAGE_KEY);
  }
}
