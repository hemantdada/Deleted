
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  public showSpinner: boolean;
  private _spinnerSubscription: Subscription;

  constructor(private spinnerService: SpinnerService) {
    this.showSpinner = false;
  }

  public ngOnInit(): void {
    this._spinnerSubscription = this.spinnerService.showSpinner$
      .subscribe((value: boolean) => {
        this.showSpinner = value;
      });
  }

  public ngOnDestroy(): void {
    if (this._spinnerSubscription) {
      this._spinnerSubscription.unsubscribe();
    }
  }

}
