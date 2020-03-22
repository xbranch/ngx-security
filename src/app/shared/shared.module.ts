import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { HighlightModule } from 'ngx-highlightjs';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,

    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,

    HighlightModule
  ],
  exports: [
    CommonModule,

    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,

    HighlightModule
  ]
})
export class SharedModule {
}
