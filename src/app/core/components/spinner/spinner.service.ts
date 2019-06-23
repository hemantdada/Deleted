
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _requestQueue: Array<string>;
  private _isSpinnerVisible: boolean;
  private _showSpinner$: Subject<boolean>;

  constructor() {
    this._requestQueue = [];
    this._isSpinnerVisible = false;
    this._showSpinner$ = new Subject<boolean>();
  }

  public get showSpinner$(): Observable<boolean> {
    return this._showSpinner$.asObservable();
  }

  public requestSent(url: string): void {
    if (url.indexOf('ignoreSpinner=true') === -1) {
      this._requestQueue.push(url);
      if (!this._isSpinnerVisible && this._requestQueue.length > 0) {
        this._isSpinnerVisible = true;
        this._showSpinner$.next(this._isSpinnerVisible);
      }
    }
  }

  public responseReceived(url: string): void {
    if (this._requestQueue.indexOf(url) > -1) {
      this._requestQueue.splice(this._requestQueue.indexOf(url), 1);
      if (this._requestQueue.length === 0) {
        this._isSpinnerVisible = false;
        this._showSpinner$.next(this._isSpinnerVisible);
      }
    }
  }

}
