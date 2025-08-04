import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import { StandardSubjectService, SubjectService } from '@ngx-security/core';

import { StandardSubjectRolesProvider, SubjectRolesProvider } from './subject-roles.provider';

export interface SecurityRolesModuleConfig {
  subject?: Provider;
  subjectRoles?: Provider;
}

export function provideSecurityRoles(config: SecurityRolesModuleConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    config.subject || {provide: SubjectService, useClass: StandardSubjectService},
    config.subjectRoles || {provide: SubjectRolesProvider, useClass: StandardSubjectRolesProvider}
  ]);
}
