import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokensService } from '../tokens/tokens.service';
import { AuthTokens } from '../tokens/auth-tokens';

@Injectable()
export class ClientCredentialsFlowService {

  constructor(private tokens: TokensService) {
  }

  /**
   * Authenticate via client credentials oAuth2 flow.
   *
   * @param params: additional parameters
   * @param headers: additional headers
   */
  authenticate(params: HttpParams = new HttpParams(), headers: HttpHeaders = new HttpHeaders()): Observable<AuthTokens> {
    return this.tokens.authenticateWithClientCredentials(params, headers);
  }

  /**
   * Clear authentication state. See {@link TokensService.clear}
   */
  clear(): void {
    this.tokens.clear();
  }
}
