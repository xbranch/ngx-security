import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AuthHttpInterceptor } from './interceptor/auth-http.interceptor';
import { TokensService } from './service/tokens/tokens.service';
import { AuthHttpInterceptorOptions } from './interceptor/auth-http-interceptor-options';
import { TokensServiceOptions } from './service/tokens/tokens-service-options';
import { PasswordFlowOptions } from './service/password-flow/password-flow-options';
import { ImplicitFlowOptions } from './service/implicit-flow/implicit-flow-options';
import { AuthorizationCodeFlowOptions } from './service/authorization-code-flow/authorization-code-flow-options';
import { ClientCredentialsFlowOptions } from './service/client-credentials-flow/client-credentials-flow-options';
import { AuthSubjectService } from './service/subject/auth-subject.service';
import { AuthSubjectServiceOptions } from './service/subject/auth-subject-service-options';
import { PasswordFlowService } from './service/password-flow/password-flow.service';
import { ImplicitFlowService } from './service/implicit-flow/implicit-flow.service';
import { AuthorizationCodeFlowService } from './service/authorization-code-flow/authorization-code-flow.service';
import { ClientCredentialsFlowService } from './service/client-credentials-flow/client-credentials-flow.service';

export interface SecurityAuthModuleConfig {
  tokens?: TokensServiceOptions;
  passwordFlow?: PasswordFlowOptions;
  implicitFlow?: ImplicitFlowOptions;
  authorizationCodeFlow?: AuthorizationCodeFlowOptions;
  clientCredentialsFlow?: ClientCredentialsFlowOptions;
  subject?: AuthSubjectServiceOptions;
  interceptor?: AuthHttpInterceptorOptions;
}

export function tokensFactory(options: TokensServiceOptions, passwordFlowOptions: PasswordFlowOptions,
                              authorizationCodeFlowOptions: AuthorizationCodeFlowOptions,
                              clientCredentialsFlowOptions: ClientCredentialsFlowOptions): (http: HttpClient) => TokensService {
  const factory = (http: HttpClient) =>
    new TokensService(http, new TokensServiceOptions(options), new PasswordFlowOptions(passwordFlowOptions),
      new AuthorizationCodeFlowOptions(authorizationCodeFlowOptions), new ClientCredentialsFlowOptions(clientCredentialsFlowOptions));
  return factory;
}

export function passwordFlowFactory(): (tokens: TokensService) => PasswordFlowService {
  const factory = (tokens: TokensService) => new PasswordFlowService(tokens);
  return factory;
}

export function implicitFlowFactory(options: ImplicitFlowOptions): (tokens: TokensService) => ImplicitFlowService {
  const factory = (tokens: TokensService) => new ImplicitFlowService(tokens, new ImplicitFlowOptions(options));
  return factory;
}

export function authorizationCodeFlowFactory(options: AuthorizationCodeFlowOptions): (tokens: TokensService) =>
  AuthorizationCodeFlowService {
  const factory = (tokens: TokensService) =>
    new AuthorizationCodeFlowService(tokens, new AuthorizationCodeFlowOptions(options));
  return factory;
}

export function clientCredentialsFlowFactory(): (tokens: TokensService) => ClientCredentialsFlowService {
  const factory = (tokens: TokensService) => new ClientCredentialsFlowService(tokens);
  return factory;
}

export function authSubjectFactory(options: AuthSubjectServiceOptions): (tokens: TokensService) => AuthSubjectService<any> {
  const factory = (tokens: TokensService) => new AuthSubjectService(tokens, new AuthSubjectServiceOptions(options));
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
          useFactory: tokensFactory(config.tokens, config.passwordFlow, config.authorizationCodeFlow, config.clientCredentialsFlow),
          deps: [HttpClient]
        },
        {
          provide: PasswordFlowService,
          useFactory: passwordFlowFactory(),
          deps: [TokensService]
        },
        {
          provide: ImplicitFlowService,
          useFactory: implicitFlowFactory(config.implicitFlow),
          deps: [TokensService]
        },
        {
          provide: AuthorizationCodeFlowService,
          useFactory: authorizationCodeFlowFactory(config.authorizationCodeFlow),
          deps: [TokensService]
        },
        {
          provide: ClientCredentialsFlowService,
          useFactory: clientCredentialsFlowFactory(),
          deps: [TokensService]
        },
        {
          provide: AuthSubjectService,
          useFactory: authSubjectFactory(config.subject),
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
