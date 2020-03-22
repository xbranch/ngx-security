import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { TokensService } from '../service/tokens/tokens.service';
import { AuthHttpInterceptorOptions } from './auth-http-interceptor-options';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private tokens: TokensService, protected options: AuthHttpInterceptorOptions = new AuthHttpInterceptorOptions()) {
  }

  /**
   * Intercept all requests and append Authorization header with access token if requested url is in whitelisted URLs. See
   * {@link isWhitelistedUrl}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isWhitelistedUrl(request)) {
      return next.handle(request);
    }
    return this.tokens.getValidAccessToken().pipe(
      mergeMap(accessToken => next.handle(request.clone({
        setHeaders: {'Authorization': `Bearer ${accessToken}`}
      })))
    );
  }

  /**
   * Check if requested url is whitelisted. Whitelisted URLs can be passed via {@link AuthHttpInterceptorOptions.whitelistedUrls}
   */
  private isWhitelistedUrl(request: HttpRequest<any>): boolean {
    const url = request.url;
    return this.options.whitelistedUrls
      .findIndex(d => typeof d === 'string' ? d === url : d instanceof RegExp ? d.test(url) : false) > -1;
  }
}
