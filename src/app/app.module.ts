import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { HighlightModule } from 'ngx-highlightjs';

import { SecurityRolesModule } from '../../projects/roles/src/lib/roles.module';
import { SecurityPermissionsModule } from '../../projects/permissions/src/lib/permissions.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,

    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,

    HighlightModule.forRoot({
      theme: 'agate',
      path: 'assets/highlight'
    }),

    SecurityRolesModule.forRoot(),
    SecurityPermissionsModule.forRoot()
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
