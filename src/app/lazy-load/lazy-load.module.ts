
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LazyLoadRoutingModule } from './lazy-load-routing.module';

import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LazyLoadRoutingModule,
    FormsModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class LazyLoadModule { }
