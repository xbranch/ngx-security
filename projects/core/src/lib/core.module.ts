import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { SimpleSubjectProvider, SubjectService } from './subject/subject.service';

export interface SecurityCoreModuleConfig {
  subject?: Provider;
}

@NgModule({
  imports: []
})
export class SecurityCoreModule {
  static forRoot(config: SecurityCoreModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: SecurityCoreModule,
      providers: [
        config.subject || {provide: SubjectService, useClass: SimpleSubjectProvider}
      ]
    };
  }
}
