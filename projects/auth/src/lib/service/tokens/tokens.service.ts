import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable, of, Subject, throwError } from 'rxjs';
import { finalize, last, map, mergeMap, take, tap } from 'rxjs/operators';

import { TokensServiceOptions } from './tokens-service-options';
import { SessionStorageUtil } from '../../util/session-storage.util';
import { LocaleStorageUtil } from '../../util/locale-storage.util';
import { JwtUtil } from '../../util/jwt.util';
import { AuthFlowType } from '../auth-flow-options';
import { ClientCredentialsFlowOptions } from '../client-credentials-flow/client-credentials-flow-options';
import { PasswordFlowOptions } from '../password-flow/password-flow-options';
import { AuthorizationCodeFlowOptions } from '../authorization-code-flow/authorization-code-flow-options';
import { AuthTokens } from './auth-tokens';

@Injectable()
export class TokensService implements OnDestroy {

  private static ACCESS_TOKEN_KEY = 'access_token';
  private static REFRESH_TOKEN_KEY = 'refresh_token';

  private accessToken: BehaviorSubject<string> = new BehaviorSubject(SessionStorageUtil.get(TokensService.ACCESS_TOKEN_KEY));
  private refreshToken: BehaviorSubject<string> = new BehaviorSubject(LocaleStorageUtil.get(TokensService.REFRESH_TOKEN_KEY));
  private accessTokenPending: Subject<void> = null;

  accessToken$: Observable<string> = this.accessToken.asObservable();
  refreshToken$: Observable<string> = this.refreshToken.asObservable();

  constructor(private http: HttpClient, private options: TokensServiceOptions, private passwordFlowOptions: PasswordFlowOptions,
              private authorizationCodeFlowOptions: AuthorizationCodeFlowOptions,
              private clientCredentialsFlowOptions: ClientCredentialsFlowOptions) {
  }

  /**
   * Clean up
   * @ignore
   */
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
    SessionStorageUtil.put(TokensService.ACCESS_TOKEN_KEY, token);
    this.accessToken.next(token);
  }

  /**
   * Save refresh token to local storage and update current refresh token state.
   *
   * @param token: refresh token
   */
  setRefreshToken(token: string): void {
    LocaleStorageUtil.put(TokensService.REFRESH_TOKEN_KEY, token);
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
   * Return authentication flow type of current access token
   */
  getAuthenticationFlowType(token: string = this.getAccessToken()): AuthFlowType | null {
    const clientId: string = JwtUtil.getTokenClientId(token);
    if (!clientId) {
      return null;
    }
    if (this.passwordFlowOptions.clientId === clientId) {
      return AuthFlowType.PASSWORD;
    } else if (this.authorizationCodeFlowOptions.clientId === clientId) {
      return AuthFlowType.AUTHORIZATION_CODE;
    } else if (this.clientCredentialsFlowOptions.clientId === clientId) {
      return AuthFlowType.CLIENT_CREDENTIALS;
    }
    return null;
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
      return this.accessTokenPending.pipe(last(), mergeMap(() => this.accessToken$.pipe(take(1))));
    }

    this.accessTokenPending = new Subject();

    return combineLatest([this.accessToken$, this.refreshToken$]).pipe(
      mergeMap(([accessToken, refreshToken]) => {
        if (!accessToken && !refreshToken) {
          return throwError({message: 'Authentication token is missing'});
        }
        if (accessToken) {
          if (JwtUtil.isTokenExpired(accessToken)) {

            if (this.getAuthenticationFlowType(accessToken) === AuthFlowType.CLIENT_CREDENTIALS) {
              return this.authenticateWithClientCredentials().pipe(map(tokens => tokens.accessToken));
            }

            if (!refreshToken) {
              return throwError({message: 'Access token expired', details: 'No refresh token to obtain new access token'});
            }

            if (JwtUtil.isTokenExpired(refreshToken)) {
              return throwError({message: 'Refresh token expired', details: 'Cannot obtain new access token'});
            }

            // obtain new access token
            return this.authenticateWithRefreshToken(refreshToken).pipe(map(tokens => tokens.accessToken));
          }
          return of(accessToken);
        }

        if (JwtUtil.isTokenExpired(refreshToken)) {
          return throwError({message: 'Access token is missing', details: 'Refresh token expired - cannot obtain new access token'});
        } else {
          // obtain new access token
          return this.authenticateWithRefreshToken(refreshToken).pipe(map(tokens => tokens.accessToken));
        }
      }),
      take(1),
      finalize(() => {
        this.accessTokenPending.next();
        this.accessTokenPending.complete();
      })
    );
  }

  /**
   * Authenticate via password oAuth2 flow.
   *
   * @param username: subject identifier
   * @param password: subject credentials
   * @param params: additional parameters
   * @param headers: additional headers
   */
  authenticateWithPassword(username: string, password: string, params: HttpParams = new HttpParams(),
                           headers: HttpHeaders = new HttpHeaders()): Observable<AuthTokens> {
    params = (params || new HttpParams())
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    headers = (headers || new HttpHeaders())
      .set('Content-Type', 'application/x-www-form-urlencoded');

    if (this.passwordFlowOptions.useHttpBasicAuth) {
      headers = headers
        .set('Authorization', `Basic ${btoa(`${this.passwordFlowOptions.clientId}:${this.passwordFlowOptions.clientSecret}`)}`);
    }

    return this.http.post<any>(this.passwordFlowOptions.tokenUrl, params, {headers: headers}).pipe(
      map(tokens => this.transform(tokens)),
      tap(token => this.setTokens(token.accessToken || null, token.refreshToken || null))
    );
  }

  /**
   * Refresh access token via refresh_token oAuth2 grant type.
   *
   * @param refreshToken: a valid refresh token
   * @param params: additional parameters
   * @param headers: additional parameters
   */
  authenticateWithRefreshToken(refreshToken: string, params: HttpParams = new HttpParams(),
                               headers: HttpHeaders = new HttpHeaders()): Observable<AuthTokens> {
    if (!refreshToken) {
      return throwError({message: 'Refresh token must not be empty'});
    }

    params = (params || new HttpParams())
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    headers = (headers || new HttpHeaders())
      .set('Content-Type', 'application/x-www-form-urlencoded');

    let tokenUrl: string = null;
    let clientId: string = null;
    let clientSecret: string = null;
    let useHttpBasicAuth: boolean = null;
    switch (this.getAuthenticationFlowType(refreshToken)) {
      case AuthFlowType.PASSWORD:
        tokenUrl = this.passwordFlowOptions.tokenUrl;
        clientId = this.passwordFlowOptions.clientId;
        clientSecret = this.passwordFlowOptions.clientSecret;
        useHttpBasicAuth = this.passwordFlowOptions.useHttpBasicAuth;
        break;
      case AuthFlowType.AUTHORIZATION_CODE:
        tokenUrl = this.authorizationCodeFlowOptions.tokenUrl;
        clientId = this.authorizationCodeFlowOptions.clientId;
        clientSecret = this.authorizationCodeFlowOptions.clientSecret;
        useHttpBasicAuth = this.authorizationCodeFlowOptions.useHttpBasicAuth;
        break;
      case AuthFlowType.CLIENT_CREDENTIALS:
        tokenUrl = this.clientCredentialsFlowOptions.tokenUrl;
        clientId = this.clientCredentialsFlowOptions.clientId;
        clientSecret = this.clientCredentialsFlowOptions.clientSecret;
        useHttpBasicAuth = this.clientCredentialsFlowOptions.useHttpBasicAuth;
        break;
      default:
        return throwError({message: 'Refresh token authentication is not supported'});
    }

    if (!tokenUrl) {
      return throwError({message: 'Refresh token not supported'});
    }

    if (clientSecret && useHttpBasicAuth) {
      headers = headers.set('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`);
    }

    return this.http.post<any>(tokenUrl, params, {headers}).pipe(
      map(tokens => this.transform(tokens)),
      tap(token => this.setTokens(token.accessToken || null, token.refreshToken || null))
    );
  }

  /**
   * Fetch access token and refresh token via authorization_code oAuth2 grant type.
   *
   * @param code: a valid code form authorization code flow redirection
   * @param params: additional parameters
   * @param headers: additional parameters
   */
  authenticateWithAuthorizationCode(code: string, params: HttpParams = new HttpParams(),
                                    headers: HttpHeaders = new HttpHeaders()): Observable<AuthTokens> {
    params = (params || new HttpParams())
      .set('grant_type', 'authorization_code')
      .set('code', code);

    headers = (headers || new HttpHeaders())
      .set('Content-Type', 'application/x-www-form-urlencoded');

    if (this.authorizationCodeFlowOptions.useHttpBasicAuth) {
      headers = headers.set('Authorization', `Basic ${btoa(`${this.authorizationCodeFlowOptions.clientId}:${this.authorizationCodeFlowOptions.clientSecret}`)}`);
    } else {
      params = params.set('client_id', this.authorizationCodeFlowOptions.clientId);

      if (this.authorizationCodeFlowOptions.clientSecret) {
        params = params.set('client_secret', this.authorizationCodeFlowOptions.clientSecret);
      }
    }

    return this.http.post<any>(this.authorizationCodeFlowOptions.tokenUrl, params, {headers}).pipe(
      map(tokens => this.transform(tokens)),
      tap(token => this.setTokens(token.accessToken || null, token.refreshToken || null))
    );
  }

  /**
   * Authenticate via client credentials oAuth2 flow.
   *
   * @param params: additional parameters
   * @param headers: additional headers
   */
  authenticateWithClientCredentials(params: HttpParams = new HttpParams(),
                                    headers: HttpHeaders = new HttpHeaders()): Observable<AuthTokens> {
    params = (params || new HttpParams())
      .set('grant_type', 'client_credentials');

    headers = (headers || new HttpHeaders())
      .set('Content-Type', 'application/x-www-form-urlencoded');

    if (this.clientCredentialsFlowOptions.useHttpBasicAuth) {
      headers = headers
        .set('Authorization', `Basic ${btoa(`${this.clientCredentialsFlowOptions.clientId}:${this.clientCredentialsFlowOptions.clientSecret}`)}`);
    }
    return this.http.post<any>(this.clientCredentialsFlowOptions.tokenUrl, params, {headers: headers}).pipe(
      map(tokens => this.transform(tokens)),
      tap(token => this.setTokens(token.accessToken || null, token.refreshToken || null))
    );
  }

  /**
   * Clear token state. Remove from session-storage and local-storage too.
   */
  clear(): void {
    this.accessToken.next(null);
    SessionStorageUtil.remove(TokensService.ACCESS_TOKEN_KEY);
    this.refreshToken.next(null);
    LocaleStorageUtil.remove(TokensService.REFRESH_TOKEN_KEY);
  }

  /**
   * Transform tokens {@link TokensServiceOptions.mapper}
   * @param tokens
   * @ignore
   */
  private transform(tokens: any): AuthTokens {
    return this.options.mapper(tokens);
  }
}
