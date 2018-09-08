import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule
} from '@angular/material';
import { HighlightModule } from 'ngx-highlightjs';

import { SecurityRolesModule } from '../../../projects/roles/src/lib/roles.module';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RolesRoutingModule,

    SecurityRolesModule.forChild(),

    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,

    HighlightModule
  ],
  declarations: [
    RolesComponent
  ]
})
export class RolesModule {
}
