import { NgModule } from '@angular/core';

import { SecurityPermissionsModule } from '../../../projects/permissions/src/lib/permissions.module';

import { SharedModule } from '../shared/shared.module';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';

@NgModule({
  imports: [
    SharedModule,
    PermissionsRoutingModule,

    SecurityPermissionsModule.forChild()
  ],
  declarations: [
    PermissionsComponent
  ]
})
export class PermissionsModule {
}
