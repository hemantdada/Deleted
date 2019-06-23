
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SanitizeHtmlPipe } from './pipes/sanitize-html/sanitize-html.pipe';
import { TrustHtmlPipe } from './pipes/trust-html/trust-html.pipe';
import { TrustResourceURLPipe } from './pipes/trust-resource-url/trust-resource-url.pipe';

import { HttpService } from './services/http/http.service';
import { RoutingService } from './services/routing/routing.service';
import { HttpErrorHandlerService } from './services/http-error-handler/http-error-handler.service';
import { WindowService } from './services/window/window.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    SanitizeHtmlPipe,
    TrustHtmlPipe,
    TrustResourceURLPipe
  ],
  exports: [
    SanitizeHtmlPipe,
    TrustHtmlPipe,
    TrustResourceURLPipe,
    FormsModule
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        WindowService, HttpErrorHandlerService, HttpService, RoutingService,
        SanitizeHtmlPipe, TrustHtmlPipe, TrustResourceURLPipe
      ]
    };
  }
}
