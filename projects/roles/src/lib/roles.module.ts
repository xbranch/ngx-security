import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { HasAnyRoleDirective } from './has-any-role/has-any-role.directive';
import { HasRoleDirective } from './has-role/has-role.directive';
import { HasRolePipe } from './has-role/has-role.pipe';
import { HasAnyRolePipe } from './has-any-role/has-any-role.pipe';
import { HasRolesPipe } from './has-roles/has-roles.pipe';
import { HasRolesDirective } from './has-roles/has-roles.directive';
import { SubjectRolesProvider, UpdatableSubjectRolesProvider } from './subject-roles.provider';

export interface SecurityRolesModuleConfig {
  subjectRoles?: Provider;
}

@NgModule({
  declarations: [
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

  static forRoot(config: SecurityRolesModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: SecurityRolesModule,
      providers: [
        config.subjectRoles || {provide: SubjectRolesProvider, useClass: UpdatableSubjectRolesProvider}
      ]
    };
  }

  static forChild(config: SecurityRolesModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: SecurityRolesModule,
      providers: []
    };
  }
}
