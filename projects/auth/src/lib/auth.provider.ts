import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Subject, SubjectDetails, SubjectService } from '@ngx-security/core';

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

export interface SecurityAuthModuleConfig<D extends SubjectDetails, S extends Subject<D>> {
  tokens?: TokensServiceOptions;
  passwordFlow?: PasswordFlowOptions;
  implicitFlow?: ImplicitFlowOptions;
  authorizationCodeFlow?: AuthorizationCodeFlowOptions;
  clientCredentialsFlow?: ClientCredentialsFlowOptions;
  subject?: AuthSubjectServiceOptions<D, S>;
  interceptor?: AuthHttpInterceptorOptions;
}

export function tokensFactory(options: TokensServiceOptions, passwordFlowOptions: PasswordFlowOptions,
                              authorizationCodeFlowOptions: AuthorizationCodeFlowOptions,
                              clientCredentialsFlowOptions: ClientCredentialsFlowOptions): (http: HttpClient) => TokensService {
  return (http: HttpClient) =>
    new TokensService(http, new TokensServiceOptions(options), new PasswordFlowOptions(passwordFlowOptions),
      new AuthorizationCodeFlowOptions(authorizationCodeFlowOptions), new ClientCredentialsFlowOptions(clientCredentialsFlowOptions));
}

export function passwordFlowFactory(): (tokens: TokensService) => PasswordFlowService {
  return (tokens: TokensService) => new PasswordFlowService(tokens);
}

export function implicitFlowFactory(options: ImplicitFlowOptions): (tokens: TokensService) => ImplicitFlowService {
  return (tokens: TokensService) => new ImplicitFlowService(tokens, new ImplicitFlowOptions(options));
}

export function authorizationCodeFlowFactory(options: AuthorizationCodeFlowOptions): (tokens: TokensService) =>
  AuthorizationCodeFlowService {
  return (tokens: TokensService) =>
    new AuthorizationCodeFlowService(tokens, new AuthorizationCodeFlowOptions(options));
}

export function clientCredentialsFlowFactory(): (tokens: TokensService) => ClientCredentialsFlowService {
  return (tokens: TokensService) => new ClientCredentialsFlowService(tokens);
}

export function authSubjectFactory<D extends SubjectDetails, S extends Subject<D>>(options: AuthSubjectServiceOptions<D, S>)
  : (tokens: TokensService) => AuthSubjectService<D, S> {
  return (tokens: TokensService) => new AuthSubjectService(tokens, new AuthSubjectServiceOptions(options));
}

export function interceptorFactory(options: AuthHttpInterceptorOptions): (tokens: TokensService) => AuthHttpInterceptor {
  return (tokens: TokensService) => new AuthHttpInterceptor(tokens, new AuthHttpInterceptorOptions(options));
}

export function provideSecurityAuth<D extends SubjectDetails, S extends Subject<D>>(config: SecurityAuthModuleConfig<D, S> = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
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
      provide: SubjectService,
      useFactory: authSubjectFactory(config.subject),
      deps: [TokensService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: interceptorFactory(config.interceptor),
      deps: [TokensService],
      multi: true
    }
  ]);
}
