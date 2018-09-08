import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,

    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
