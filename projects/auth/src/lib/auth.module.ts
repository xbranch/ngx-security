import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { ImplicitFlowAuthService } from './service/implicit-flow/implicit-flow-auth.service';
import { AuthHttpInterceptor } from './interceptor/auth-http.interceptor';
import { TokensService } from './service/tokens/tokens.service';
import { AuthHttpInterceptorOptions } from './interceptor/auth-http-interceptor-options';
import { TokensServiceOptions } from './service/tokens/tokens-service-options';
import { PasswordFlowAuthService } from './service/password-flow/password-flow-auth.service';
import { PasswordFlowOptions } from './service/password-flow/password-flow-options';
import { ImplicitFlowOptions } from './service/implicit-flow/implicit-flow-options';
import { AuthorizationCodeFlowOptions } from './service/authorization-code-flow/authorization-code-flow-options';
import { AuthFlowOptions } from './service/auth-flow-options';
import { AuthorizationCodeFlowAuthService } from './service/authorization-code-flow/authorization-code-flow-auth.service';
import { ClientCredentialsFlowAuthService } from './service/client-credentials-flow/client-credentials-flow-auth.service';
import { ClientCredentialsFlowOptions } from './service/client-credentials-flow/client-credentials-flow-options';
import { AuthSubjectService } from './service/subject/auth-subject.service';

export interface SecurityAuthModuleConfig {
  tokens?: TokensServiceOptions;
  passwordFlow?: PasswordFlowOptions;
  implicitFlow?: ImplicitFlowOptions;
  authorizationCodeFlow?: AuthorizationCodeFlowOptions;
  clientCredentialsFlow?: ClientCredentialsFlowOptions;
  interceptor?: AuthHttpInterceptorOptions;
}

export function tokensFactory(options: TokensServiceOptions): (http: HttpClient) => TokensService {
  const factory = (http: HttpClient) => new TokensService(http, new TokensServiceOptions(options));
  return factory;
}

export function passwordFlowFactory(options: AuthFlowOptions): (http: HttpClient, tokens: TokensService) => PasswordFlowAuthService {
  const factory = (http: HttpClient, tokens: TokensService) => new PasswordFlowAuthService(http, tokens, new PasswordFlowOptions(options));
  return factory;
}

export function implicitFlowFactory(options: AuthFlowOptions): (http: HttpClient, tokens: TokensService) => ImplicitFlowAuthService {
  const factory = (http: HttpClient, tokens: TokensService) => new ImplicitFlowAuthService(http, tokens, new ImplicitFlowOptions(options));
  return factory;
}

export function authorizationCodeFlowFactory(options: AuthFlowOptions): (http: HttpClient, tokens: TokensService) =>
  AuthorizationCodeFlowAuthService {
  const factory = (http: HttpClient, tokens: TokensService) =>
    new AuthorizationCodeFlowAuthService(http, tokens, new AuthorizationCodeFlowOptions(options));
  return factory;
}

export function clientCredentialsFlowFactory(options: AuthFlowOptions): (http: HttpClient, tokens: TokensService) =>
  ClientCredentialsFlowAuthService {
  const factory = (http: HttpClient, tokens: TokensService) =>
    new ClientCredentialsFlowAuthService(http, tokens, new ClientCredentialsFlowOptions(options));
  return factory;
}

export function authSubjectFactory(options: TokensServiceOptions): (tokens: TokensService) => AuthSubjectService<any> {
  const factory = (tokens: TokensService) => new AuthSubjectService(tokens, new TokensServiceOptions(options));
  return factory;
}

export function interceptorFactory(options: AuthHttpInterceptorOptions): (tokens: TokensService) => AuthHttpInterceptor {
  const factory = (tokens: TokensService) => new AuthHttpInterceptor(tokens, new AuthHttpInterceptorOptions(options));
  return factory;
}


@NgModule()
export class SecurityAuthModule {

  static forRoot(config: SecurityAuthModuleConfig = {}): ModuleWithProviders<SecurityAuthModule> {
    return {
      ngModule: SecurityAuthModule,
      providers: [
        {
          provide: TokensService,
          useFactory: tokensFactory(config.tokens),
          deps: [HttpClient, AuthSubjectService]
        },
        {
          provide: PasswordFlowAuthService,
          useFactory: passwordFlowFactory(config.passwordFlow),
          deps: [HttpClient, TokensService]
        },
        {
          provide: ImplicitFlowAuthService,
          useFactory: implicitFlowFactory(config.implicitFlow),
          deps: [HttpClient, TokensService]
        },
        {
          provide: AuthorizationCodeFlowAuthService,
          useFactory: authorizationCodeFlowFactory(config.authorizationCodeFlow),
          deps: [HttpClient, TokensService]
        },
        {
          provide: ClientCredentialsFlowAuthService,
          useFactory: clientCredentialsFlowFactory(config.clientCredentialsFlow),
          deps: [HttpClient, TokensService]
        },
        {
          provide: AuthSubjectService,
          useFactory: authSubjectFactory,
          deps: [TokensService]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: interceptorFactory(config.interceptor),
          deps: [TokensService],
          multi: true
        }
      ]
    };
  }
}
