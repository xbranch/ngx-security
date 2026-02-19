import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHighlightOptions } from 'ngx-highlightjs';

import { provideSecurityCore } from '../../projects/core/src/lib/core.provider';
import { provideSecurityRoles } from '../../projects/roles/src/lib/roles.provider';
import { provideSecurityPermissions } from '../../projects/permissions/src/lib/permissions.provider';
import { provideSecurityAuth } from '../../projects/auth/src/lib/auth.provider';
import { SubjectRolesProvider, UpdatableSubjectRolesProvider } from '../../projects/roles/src/lib/subject-roles.provider';
import {
  SubjectPermissionsProvider,
  UpdatableSubjectPermissionsProvider
} from '../../projects/permissions/src/lib/subject-permissions.provider';
import { AuthTokens } from '../../projects/auth/src/lib/service/tokens/auth-tokens';
import { Subject } from '../../projects/core/src/lib/subject/subject.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptorsFromDi()),
    provideSecurityCore(),
    provideSecurityRoles({
      subjectRoles: {provide: SubjectRolesProvider, useClass: UpdatableSubjectRolesProvider}
    }),
    provideSecurityPermissions({
      subjectPermissions: {provide: SubjectPermissionsProvider, useClass: UpdatableSubjectPermissionsProvider}
    }),
    provideSecurityAuth({
      passwordFlow: {
        tokenUrl: 'tokenUrl',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        useHttpBasicAuth: true
      },
      implicitFlow: {
        loginUrl: 'loginUrl',
        clientId: 'clientId'
      },
      authorizationCodeFlow: {
        loginUrl: 'loginUrl',
        tokenUrl: 'tokenUrl',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        useHttpBasicAuth: true
      },
      clientCredentialsFlow: {
        tokenUrl: 'tokenUrl',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
      },
      tokens: {
        mapper: (tokens: any): AuthTokens => {
          tokens = tokens || {};
          return {
            accessToken: tokens['access_token'] || tokens['accessToken'] || null,
            refreshToken: tokens['refresh_token'] || tokens['refreshToken'] || null
          };
        }
      },
      subject: {
        mapper: (jwt: any): Subject<any> => {
          jwt = jwt || {};
          return {
            principal: jwt['user_name'] || jwt['username'] || jwt['email'] || null,
            authorities: jwt['authorities'] || [],
            details: jwt
          } as Subject<any>;
        }
      } as any,
      interceptor: {
        whitelistedUrls: [new RegExp('.*/my-api.*')]
      }
    }),
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        scss: () => import('highlight.js/lib/languages/scss'),
        xml: () => import('highlight.js/lib/languages/xml'),
        bash: () => import('highlight.js/lib/languages/bash')
      }
    })
  ]
};
