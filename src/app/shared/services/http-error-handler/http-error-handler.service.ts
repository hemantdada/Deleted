
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  /* TODO: Replace console.log with expected error handling. */
  public handleCommonErrors(response: HttpErrorResponse): void {

    switch (response.status) {
      case 404:
        console.log(response.message);
        break;
      case 500:
        console.log(response.message);
        break;
      default:
        break;
    }

  }

}
