import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TokensService } from '../tokens/tokens.service';
import { PasswordFlowOptions } from './password-flow-options';
import { AuthToken } from '../tokens/auth-token';

@Injectable()
export class PasswordFlowAuthService {

  constructor(private http: HttpClient, private tokens: TokensService, private options: PasswordFlowOptions) {
  }

  /**
   * Authenticate via password oAuth2 flow.
   *
   * @param username: subject identifier
   * @param password: subject credentials
   * @param params: additional parameters
   * @param headers: additional headers
   */
  authenticate(username: string, password: string, params: HttpParams = new HttpParams(),
               headers: HttpHeaders = new HttpHeaders()): Observable<AuthToken> {
    params = (params || new HttpParams())
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    headers = (headers || new HttpHeaders())
      .set('Content-Type', 'application/x-www-form-urlencoded');

    if (this.options.useHttpBasicAuth) {
      headers = headers.set('Authorization', 'Basic ' + btoa(`${this.options.clientId}:${this.options.clientSecret}`));
    }

    return this.http.post<AuthToken>(this.options.tokenUrl, params, {headers: headers}).pipe(
      tap(token => this.tokens.setTokens(token.access_token, token.refresh_token))
    );
  }

  /**
   * Clear authentication state. See {@link TokensService.clear}
   */
  clear(): void {
    this.tokens.clear();
  }
}
