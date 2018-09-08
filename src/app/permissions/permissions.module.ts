import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { HighlightModule } from 'ngx-highlightjs';

import { SecurityPermissionsModule } from '../../../projects/permissions/src/lib/permissions.module';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';

@NgModule({
  imports: [
    CommonModule,
    PermissionsRoutingModule,

    SecurityPermissionsModule.forChild(),

    MatTabsModule,
    MatCardModule,

    HighlightModule
  ],
  declarations: [
    PermissionsComponent
  ]
})
export class PermissionsModule {
}
