import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
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
