import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable, of, Subject, throwError } from 'rxjs';
import { finalize, map, mergeMap, skipUntil, take, tap } from 'rxjs/operators';

import { TokensServiceOptions } from './tokens-service-options';
import { SessionStorageUtil } from '../../util/session-storage.util';
import { LocaleStorageUtil } from '../../util/locale-storage.util';
import { JwtUtil } from '../../util/jwt.util';
import { AuthToken } from './auth-token';
import { AuthFlowType } from '../auth-flow-options';
import { ClientCredentialsFlowOptions } from '../client-credentials-flow/client-credentials-flow-options';
import { PasswordFlowOptions } from '../password-flow/password-flow-options';
import { AuthorizationCodeFlowOptions } from '../authorization-code-flow/authorization-code-flow-options';

@Injectable()
export class TokensService implements OnDestroy {

  private static ACCESS_TOKEN_KEY = 'access_token';
  private static REFRESH_TOKEN_KEY = 'refresh_token';
  private static AUTH_FLOW_TYPE_KEY = 'auth_flow_type';

  private accessToken: BehaviorSubject<string> = new BehaviorSubject(SessionStorageUtil.get(TokensService.ACCESS_TOKEN_KEY));
  private refreshToken: BehaviorSubject<string> = new BehaviorSubject(LocaleStorageUtil.get(TokensService.REFRESH_TOKEN_KEY));
  private authFlowType: BehaviorSubject<AuthFlowType> = new BehaviorSubject(LocaleStorageUtil.get(TokensService.AUTH_FLOW_TYPE_KEY));
  private accessTokenPending: Subject<void> = null;

  accessToken$: Observable<string> = this.accessToken.asObservable();
  refreshToken$: Observable<string> = this.refreshToken.asObservable();
  authFlowType$: Observable<AuthFlowType> = this.authFlowType.asObservable();

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
    this.authFlowType.complete();
  }

  /**
   * Save access token to session storage and update current access token state.
   *
   * @param token: access token
   * @param type: authentication flow type
   */
  setAccessToken(token: string, type: AuthFlowType): void {
    SessionStorageUtil.put(TokensService.ACCESS_TOKEN_KEY, token);
    this.accessToken.next(token);
    LocaleStorageUtil.put(TokensService.AUTH_FLOW_TYPE_KEY, type);
    this.authFlowType.next(type);
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
   * @param type: authentication flow type
   * @param refreshToken
   */
  setTokens(accessToken: string, type: AuthFlowType, refreshToken: string): void {
    this.setAccessToken(accessToken, type);
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

  getAuthenticationFlowType(): AuthFlowType {
    return this.authFlowType.getValue();
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

    return combineLatest([this.accessToken$, this.refreshToken$, this.authFlowType$]).pipe(
      take(1),
      mergeMap(([accessToken, refreshToken, authFlowType]) => {
        if (!accessToken && !refreshToken) {
          return throwError({message: 'Authentication token is missing'});
        }
        if (accessToken) {
          if (JwtUtil.isTokenExpired(accessToken)) {

            if (authFlowType === AuthFlowType.CLIENT_CREDENTIALS) {
              return this.authenticateWithClientCredentials().pipe(map(token => token.accessToken));
            }

            if (!refreshToken) {
              return throwError({message: 'Access token expired', details: 'No refresh token to obtain new access token'});
            }

            if (JwtUtil.isTokenExpired(refreshToken)) {
              return throwError({message: 'Refresh token expired', details: 'Cannot obtain new access token'});
            }

            // obtain new access token
            return this.authenticateWithRefreshToken(refreshToken).pipe(map(token => token.accessToken));
          }
          // make a call
          return of(accessToken);
        }

        if (JwtUtil.isTokenExpired(refreshToken)) {
          return throwError({message: 'Access token is missing', details: 'Refresh token expired - cannot obtain new access token'});
        } else {
          // obtain new access token
          return this.authenticateWithRefreshToken(refreshToken).pipe(map(token => token.accessToken));
        }
      }),
      finalize(() => this.accessTokenPending.complete())
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
                           headers: HttpHeaders = new HttpHeaders()): Observable<AuthToken> {
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
      tap(token => this.mapAndSetTokens(token, AuthFlowType.PASSWORD))
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
                               headers: HttpHeaders = new HttpHeaders()): Observable<AuthToken> {
    params = (params || new HttpParams())
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    headers = (headers || new HttpHeaders())
      .set('Content-Type', 'application/x-www-form-urlencoded');

    let tokenUrl: string = null;
    let clientId: string = null;
    let clientSecret: string = null;
    let useHttpBasicAuth: boolean = null;
    switch (this.getAuthenticationFlowType()) {
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
      throwError({message: 'Refresh token not supported'});
    }

    if (clientSecret && useHttpBasicAuth) {
      headers = headers.set('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`);
    }

    return this.http.post<any>(tokenUrl, params, {headers}).pipe(
      tap(token => this.mapAndSetTokens(token, this.getAuthenticationFlowType()))
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
                                    headers: HttpHeaders = new HttpHeaders()): Observable<AuthToken> {
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
      tap(token => this.mapAndSetTokens(token, AuthFlowType.AUTHORIZATION_CODE))
    );
  }

  /**
   * Authenticate via client credentials oAuth2 flow.
   *
   * @param params: additional parameters
   * @param headers: additional headers
   */
  authenticateWithClientCredentials(params: HttpParams = new HttpParams(),
                                    headers: HttpHeaders = new HttpHeaders()): Observable<AuthToken> {
    params = (params || new HttpParams())
      .set('grant_type', 'client_credentials');

    headers = (headers || new HttpHeaders())
      .set('Content-Type', 'application/x-www-form-urlencoded');

    if (this.clientCredentialsFlowOptions.useHttpBasicAuth) {
      headers = headers
        .set('Authorization', `Basic ${btoa(`${this.clientCredentialsFlowOptions.clientId}:${this.clientCredentialsFlowOptions.clientSecret}`)}`);
    }
    return this.http.post<any>(this.clientCredentialsFlowOptions.tokenUrl, params, {headers: headers}).pipe(
      tap(token => this.mapAndSetTokens(token, AuthFlowType.CLIENT_CREDENTIALS))
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
   * Use {@link TokensServiceOptions.tokenMapper} and set tokens via {@link setTokens}
   * @param token
   * @param type: authentication flow type
   * @ignore
   */
  private mapAndSetTokens(token: any, type: AuthFlowType): void {
    const authToken: AuthToken = this.options.tokenMapper(token);
    this.setTokens(authToken.accessToken || null, type, authToken.refreshToken || null);
  }
}
