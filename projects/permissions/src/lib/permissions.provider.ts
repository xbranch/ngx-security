import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import { StandardSubjectService, SubjectService } from '@ngx-security/core';

import { StandardSubjectPermissionsProvider, SubjectPermissionsProvider } from './subject-permissions.provider';

export interface SecurityPermissionsModuleConfig {
  subject?: Provider;
  subjectPermissions?: Provider;
}

export function provideSecurityPermissions(config: SecurityPermissionsModuleConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    config.subject || {provide: SubjectService, useClass: StandardSubjectService},
    config.subjectPermissions || {provide: SubjectPermissionsProvider, useClass: StandardSubjectPermissionsProvider}
  ]);

}
