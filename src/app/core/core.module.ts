
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { SpinnerService } from './components/spinner/spinner.service';

import { SpinnerInterceptor } from './interceptors/spinner.interceptor';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    SpinnerComponent
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    SpinnerComponent
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        SpinnerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SpinnerInterceptor,
          multi: true
        }
      ]
    };
  }
}
