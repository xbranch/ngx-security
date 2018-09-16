import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule, MatTabsModule } from '@angular/material';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [
    CommonModule,

    MatTabsModule,
    MatCardModule,
    MatIconModule,

    HighlightModule
  ],
  exports: [
    CommonModule,

    MatTabsModule,
    MatCardModule,
    MatIconModule,

    HighlightModule
  ]
})
export class SharedModule {
}
