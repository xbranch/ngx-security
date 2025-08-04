import { NgModule } from '@angular/core';

import { IsPermittedDirective } from './is-permitted/is-permitted.directive';
import { IsPermittedPipe } from './is-permitted/is-permitted.pipe';

@NgModule({
  imports: [
    IsPermittedDirective,
    IsPermittedPipe
  ],
  exports: [
    IsPermittedDirective,
    IsPermittedPipe
  ]
})
export class SecurityPermissionsModule {
}
