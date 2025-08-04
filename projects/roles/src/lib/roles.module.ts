import { NgModule } from '@angular/core';

import { HasAnyRoleDirective } from './has-any-role/has-any-role.directive';
import { HasRoleDirective } from './has-role/has-role.directive';
import { HasRolePipe } from './has-role/has-role.pipe';
import { HasAnyRolePipe } from './has-any-role/has-any-role.pipe';
import { HasRolesPipe } from './has-roles/has-roles.pipe';
import { HasRolesDirective } from './has-roles/has-roles.directive';

@NgModule({
  imports: [
    HasAnyRoleDirective,
    HasRoleDirective,
    HasRolePipe,
    HasAnyRolePipe,
    HasRolesPipe,
    HasRolesDirective
  ],
  exports: [
    HasAnyRoleDirective,
    HasRoleDirective,
    HasRolePipe,
    HasAnyRolePipe,
    HasRolesPipe,
    HasRolesDirective
  ]
})
export class SecurityRolesModule {
}
