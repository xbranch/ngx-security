import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { StandardSubjectService, SubjectService } from './subject/subject.service';

export interface SecurityCoreModuleConfig {
  subject?: Provider;
}

@NgModule({
  imports: []
})
export class SecurityCoreModule {

  static forRoot(config: SecurityCoreModuleConfig = {}): ModuleWithProviders<SecurityCoreModule> {
    return {
      ngModule: SecurityCoreModule,
      providers: [
        config.subject || {provide: SubjectService, useClass: StandardSubjectService}
      ]
    };
  }

  static forChild(config: SecurityCoreModuleConfig = {}): ModuleWithProviders<SecurityCoreModule> {
    return {
      ngModule: SecurityCoreModule,
      providers: []
    };
  }
}
