import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import { StandardSubjectService, SubjectService } from './subject/subject.service';

export interface SecurityCoreModuleConfig {
  subject?: Provider;
}

export function provideSecurityCore(config: SecurityCoreModuleConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    config.subject || {provide: SubjectService, useClass: StandardSubjectService}
  ]);
}
