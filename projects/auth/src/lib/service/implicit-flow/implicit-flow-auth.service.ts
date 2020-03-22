import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokensService } from '../tokens/tokens.service';
import { ImplicitFlowOptions } from './implicit-flow-options';
import { UrlUtil } from '../../util/url.util';
import { SessionStorageUtil } from '../../util/session-storage.util';
import { NonceUtil } from '../../util/nonce.util';

@Injectable()
export class ImplicitFlowAuthService {

  constructor(private http: HttpClient, private tokens: TokensService, private  options: ImplicitFlowOptions) {
  }

  /**
   * Check if current URL contains user authorization attributes and save it to session storage.
   *
   * @param authenticateAutomatically: redirect user to login url if user is unauthorized
   */
  initialize(authenticateAutomatically: boolean = false): Observable<{ message: string }> {
    return new Observable(observer => {
      if (this.tokens.hasValidAccessToken()) {
        observer.next({message: 'Access token is still valid'});
        observer.complete();
        return;
      }

      const {access_token, state, error} = UrlUtil.getHashFragmentParams();

      if (error) {
        observer.error({message: error});
        return;
      }

      if (!access_token && !state && authenticateAutomatically) {
        observer.next({message: 'No access token and authenticate automatically is set to true - you will be redirected'});
        observer.complete();
        this.authenticate();
        return;
      }

      if (!access_token) {
        observer.error({message: 'No access token in URL'});
        return;
      }

      if (!state) {
        observer.error({message: 'Nonce is missing'});
        return;
      }

      if (state !== SessionStorageUtil.get<string>('nonce')) {
        observer.error({message: 'Nonce is not valid'});
        return;
      }

      this.tokens.setAccessToken(access_token);

      observer.next({message: 'Access token saved'});
      observer.complete();

      if (!this.options.preventClearHashAfterLogin) {
        location.hash = '';
      }
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
      .append('client_id', this.options.clientId)
      .append('state', nonce)
      .append('response_type', this.options.responseType)
      .append('redirect_uri', redirectUri)
      .append('scope', this.options.scope);

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
}
