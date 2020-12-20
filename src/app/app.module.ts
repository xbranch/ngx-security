import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

import { SecurityCoreModule } from '../../projects/core/src/lib/core.module';
import { SecurityRolesModule } from '../../projects/roles/src/lib/roles.module';
import { SecurityPermissionsModule } from '../../projects/permissions/src/lib/permissions.module';
import { SecurityAuthModule } from '../../projects/auth/src/lib/auth.module';
import { AuthTokens } from '../../projects/auth/src/lib/service/tokens/auth-tokens';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubjectRolesProvider, UpdatableSubjectRolesProvider } from '../../projects/roles/src/lib/subject-roles.provider';
import {
  SubjectPermissionsProvider,
  UpdatableSubjectPermissionsProvider
} from '../../projects/permissions/src/lib/subject-permissions.provider';
import { Subject } from '../../projects/core/src/lib/subject/subject.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,

    HighlightModule,

    SecurityCoreModule.forRoot(),
    SecurityRolesModule.forRoot({
      subjectRoles: {provide: SubjectRolesProvider, useClass: UpdatableSubjectRolesProvider}
    }),
    SecurityPermissionsModule.forRoot({
      subjectPermissions: {provide: SubjectPermissionsProvider, useClass: UpdatableSubjectPermissionsProvider}
    }),
    SecurityAuthModule.forRoot({
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
    })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
