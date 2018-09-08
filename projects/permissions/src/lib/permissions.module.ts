import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { SubjectPermissionsFakeProvider, SubjectPermissionsProvider } from './subject-permissions.provider';
import { IsPermittedDirective } from './is-permitted/is-permitted.directive';
import { IsPermittedPipe } from './is-permitted/is-permitted.pipe';

export interface SecurityPermissionsModuleConfig {
  subjectPermissions?: Provider;
}

@NgModule({
  declarations: [
    IsPermittedDirective,
    IsPermittedPipe
  ],
  exports: [
    IsPermittedDirective,
    IsPermittedPipe
  ]
})
export class SecurityPermissionsModule {
  static forRoot(config: SecurityPermissionsModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: SecurityPermissionsModule,
      providers: [
        config.subjectPermissions || {provide: SubjectPermissionsProvider, useClass: SubjectPermissionsFakeProvider}
      ]
    };
  }

  static forChild(config: SecurityPermissionsModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: SecurityPermissionsModule,
      providers: []
    };
  }
}
