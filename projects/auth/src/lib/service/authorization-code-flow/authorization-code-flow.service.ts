import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokensService } from '../tokens/tokens.service';
import { AuthorizationCodeFlowOptions } from './authorization-code-flow-options';
import { AuthToken } from '../tokens/auth-token';
import { UrlUtil } from '../../util/url.util';
import { SessionStorageUtil } from '../../util/session-storage.util';
import { NonceUtil } from '../../util/nonce.util';

@Injectable()
export class AuthorizationCodeFlowService {

  constructor(private tokens: TokensService, private options: AuthorizationCodeFlowOptions) {
  }

  /**
   * Check if current URL contains user partial authorization attributes and fetch tokens.
   *
   * @param authenticateAutomatically: redirect user to login url if user is unauthorized
   */
  initialize(authenticateAutomatically: boolean = false): Observable<{ message: string }> {
    return new Observable(observer => {
      if (this.tokens.hasValidAccessToken()) {
        observer.next({message: 'Access is still valid'});
        observer.complete();
        return;
      }

      const {code, state, error} = UrlUtil.getCodePartsFromUrl(window.location.search);

      if (!this.options.preventClearHashAfterLogin) {
        const href = location.href
          .replace(/[&?]code=[^&$]*/, '')
          .replace(/[&?]scope=[^&$]*/, '')
          .replace(/[&?]state=[^&$]*/, '')
          .replace(/[&?]session_state=[^&$]*/, '');

        history.replaceState(null, window.name, href);
      }

      if (error) {
        observer.error({message: error});
        return;
      }

      if (!code && !state && authenticateAutomatically) {
        observer.next({message: 'No code and authenticate automatically is set to true - you will be redirected'});
        observer.complete();
        this.authenticate();
        return;
      }

      if (!state) {
        observer.error({message: 'Nonce is missing'});
        return;
      }

      if (state !== SessionStorageUtil.get('nonce')) {
        observer.error({message: 'Nonce is not valid'});
        return;
      }

      if (!code) {
        observer.error({message: 'Code is missing'});
        return;
      }

      this.getTokenFromCode(code).subscribe(() => {
        observer.next({message: 'Tokens  saved'});
        observer.complete();
      }, observer.error);
    });
  }

  /**
   * Generate login URL and redirect to it.
   *
   * @param redirectUri: redirect URI for returning after authentication
   * @param noPrompt: oAuth2 attribute during authentication process
   * @param params: additional params
   */
  authenticate(redirectUri: string = document.location.href, noPrompt: boolean = false, params: HttpParams = new HttpParams()): void {
    document.location.href = this.loginUrl(redirectUri, noPrompt, params);
  }

  /**
   * Generate login URL
   *
   * @param redirectUri: redirect URI for returning after authentication
   * @param noPrompt: oAuth2 attribute during authentication process
   * @param params: additional params
   */
  loginUrl(redirectUri: string, noPrompt: boolean = false, params: HttpParams = new HttpParams()): string {
    const nonce = NonceUtil.createAndSaveNonce();

    params = (params || new HttpParams())
      .set('client_id', this.options.clientId)
      .set('state', nonce)
      .set('response_type', this.options.responseType)
      .set('redirect_uri', redirectUri);

    if (this.options.scope) {
      params = params.set('scope', this.options.scope);
    }

    if (this.options.resource) {
      params = params.set('resource', this.options.resource);
    }
    if (noPrompt) {
      params = params.set('prompt', 'none');
    }

    return `${this.options.loginUrl}?${params.toString()}`;
  }

  /**
   * Clear authentication state. See {@link TokensService.clear}
   */
  clear(): void {
    this.tokens.clear();
  }

  private getTokenFromCode(code: string): Observable<AuthToken> {
    let params = new HttpParams();

    if (!this.options.disablePKCE) {
      const pkciVerifier = SessionStorageUtil.get<string>('PKCI_verifier');

      if (!pkciVerifier) {
        console.warn('No PKCI verifier found in storage!');
      } else {
        params = params.set('code_verifier', pkciVerifier);
      }
    }

    return this.tokens.authenticateWithAuthorizationCode(code, params);
  }
}
