import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { HighlightModule } from 'ngx-highlightjs';

import { SecurityCoreModule } from '../../projects/core/src/lib/core.module';
import { SecurityRolesModule } from '../../projects/roles/src/lib/roles.module';
import { SecurityPermissionsModule } from '../../projects/permissions/src/lib/permissions.module';
import { SecurityAuthModule } from '../../projects/auth/src/lib/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

export function highlightLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
}

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

    HighlightModule.forRoot({
      languages: highlightLanguages
    }),

    SecurityCoreModule.forRoot(),
    SecurityRolesModule.forRoot(),
    SecurityPermissionsModule.forRoot(),
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
      interceptor: {
        whitelistedUrls: [new RegExp('.*/my-api.*')]
      }
    })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
