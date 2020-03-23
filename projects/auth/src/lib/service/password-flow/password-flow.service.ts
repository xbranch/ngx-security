import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokensService } from '../tokens/tokens.service';
import { AuthToken } from '../tokens/auth-token';

@Injectable()
export class PasswordFlowService {

  constructor(private tokens: TokensService) {
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
    return this.tokens.authenticateWithPassword(username, password, params, headers);
  }

  /**
   * Clear authentication state. See {@link TokensService.clear}
   */
  clear(): void {
    this.tokens.clear();
  }
}
