
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { WindowService } from '../window/window.service';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface IStateChanges {
  previousRoute: string;
  currentRoute: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private _previousRoute: string = '';
  private _currentRoute: string = '';
  private _stateChanges: Subject<IStateChanges> = new Subject<IStateChanges>();

  constructor(private router: Router, private windowService: WindowService) { }

  public navigateTo(url: string): Promise<boolean>  {
    return this.router.navigateByUrl(url);
  }

  public navigateBack(): void {
    if (this._previousRoute) {
      this.navigateTo(this._previousRoute);
    } else {
      this.windowService.history.back();
    }
  }

  public monitorRoutes(): void {
    this.router.events
      .pipe(filter((event: any): boolean => event instanceof NavigationEnd))
      .subscribe((routeDetails: NavigationEnd) => {
        this._previousRoute = this._currentRoute;
        this._currentRoute = routeDetails.url;
        this._stateChanges.next({
          currentRoute: this._currentRoute,
          previousRoute: this.previousRoute
        });
      });
  }

  public get previousRoute(): string {
    return this._previousRoute;
  }

  public get currentRoute(): string {
    return this._currentRoute;
  }

  public get stateChanges(): Observable<IStateChanges> {
    return this._stateChanges.asObservable();
  }

}
