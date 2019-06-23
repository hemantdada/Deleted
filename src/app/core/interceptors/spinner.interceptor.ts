
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpEvent, HttpHandler } from '@angular/common/http';
import { SpinnerService } from '../components/spinner/spinner.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url: string = req.url;
    let requestClone: HttpRequest<any>;

    requestClone = (url.indexOf('ignoreSpinner=true') > -1) ?
      req.clone({ url: this.stripignoreSpinnerQuery(req.url) }) : req.clone();

    this.spinnerService.requestSent(url);

    return next.handle(requestClone)
      .pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinnerService.responseReceived(url);
        }
        return event;
      }));

  }

  private stripignoreSpinnerQuery(url: string): string {
    return url.replace('?ignoreSpinner=true', '').replace('&ignoreSpinner=true', '');
  }

}
