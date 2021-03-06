import { NgModule } from '@angular/core';

import { SecurityCoreModule } from '../../../projects/core/src/lib/core.module';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';

@NgModule({
  imports: [
    SharedModule,
    CoreRoutingModule,

    SecurityCoreModule.forChild()
  ],
  declarations: [
    CoreComponent
  ]
})
export class CoreModule {
}
