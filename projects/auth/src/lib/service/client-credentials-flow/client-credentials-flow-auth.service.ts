import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TokensService } from '../tokens/tokens.service';
import { AuthToken } from '../tokens/auth-token';
import { ClientCredentialsFlowOptions } from './client-credentials-flow-options';

@Injectable()
export class ClientCredentialsFlowAuthService {

  constructor(private http: HttpClient, private tokens: TokensService, private options: ClientCredentialsFlowOptions) {
  }

  /**
   * Authenticate via client credentials oAuth2 flow.
   *
   * @param params: additional parameters
   * @param headers: additional headers
   */
  authenticate(params: HttpParams = new HttpParams(), headers: HttpHeaders = new HttpHeaders()): Observable<AuthToken> {
    params = (params || new HttpParams())
      .set('grant_type', 'client_credentials');

    headers = (headers || new HttpHeaders())
      .set('Content-Type', 'application/x-www-form-urlencoded');

    if (this.options.useHttpBasicAuth) {
      headers = headers.set('Authorization', 'Basic ' + btoa(`${this.options.clientId}:${this.options.clientSecret}`));
    }
    return this.http.post<AuthToken>(this.options.tokenUrl, params, {headers: headers}).pipe(
      tap(token => this.tokens.setAccessToken(token.access_token))
    );
  }

  /**
   * Clear authentication state. See {@link TokensService.clear}
   */
  clear(): void {
    this.tokens.clear();
  }
}
