import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { StandardSubjectService, SubjectService } from '@ngx-security/core';

import { StandardSubjectPermissionsProvider, SubjectPermissionsProvider } from './subject-permissions.provider';
import { IsPermittedDirective } from './is-permitted/is-permitted.directive';
import { IsPermittedPipe } from './is-permitted/is-permitted.pipe';

export interface SecurityPermissionsModuleConfig {
  subject?: Provider;
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
  static forRoot(config: SecurityPermissionsModuleConfig = {}): ModuleWithProviders<SecurityPermissionsModule> {
    return {
      ngModule: SecurityPermissionsModule,
      providers: [
        config.subject || {provide: SubjectService, useClass: StandardSubjectService},
        config.subjectPermissions || {provide: SubjectPermissionsProvider, useClass: StandardSubjectPermissionsProvider}
      ]
    };
  }

  static forChild(config: SecurityPermissionsModuleConfig = {}): ModuleWithProviders<SecurityPermissionsModule> {
    return {
      ngModule: SecurityPermissionsModule,
      providers: []
    };
  }
}
