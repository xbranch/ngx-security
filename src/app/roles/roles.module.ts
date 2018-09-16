import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatChipsModule, MatInputModule } from '@angular/material';

import { SecurityRolesModule } from '../../../projects/roles/src/lib/roles.module';

import { SharedModule } from '../shared/shared.module';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';

@NgModule({
  imports: [
    SharedModule,
    RolesRoutingModule,

    SecurityRolesModule.forChild(),

    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  declarations: [
    RolesComponent
  ]
})
export class RolesModule {
}
