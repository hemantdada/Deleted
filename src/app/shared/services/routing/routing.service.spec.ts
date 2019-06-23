
import { Component } from '@angular/core';
import { TestBed, inject, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { WindowService } from '../window/window.service';
import { RoutingService, IStateChanges } from './routing.service';
import { Subscription } from 'rxjs';

describe('shared > services', () => {
  describe('RoutingService', () => {

    @Component({
      selector: 'dummy-1-component',
      template: ''
    })
    class Dummy1Component { }

    @Component({
      selector: 'dummy-2-component',
      template: ''
    })
    class Dummy2Component { }

    let service: RoutingService, router: Router, location: Location, windowService: WindowService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'dummy1', component: Dummy1Component },
            { path: 'dummy2', component: Dummy1Component }
          ])
        ],
        declarations: [Dummy1Component, Dummy2Component],
        providers: [RoutingService, WindowService]
      });
    });

    beforeEach(inject([RoutingService, Router, Location, WindowService],
      (routingService: RoutingService, routerInject: Router, locationInject: Location, windowInject: WindowService) => {

        service = routingService;
        router = routerInject;
        location = locationInject;
        windowService = windowInject;

        router.initialNavigation();
      }));

    describe('initialization', () => {

      it('should have previous route as an empty string', () => {
        expect(service.previousRoute).toBe('');
      });

      it('should have current route as an empty string', () => {
        expect(service.currentRoute).toBe('');
      });

    });

    describe('monitorRoutes()', () => {

      it('should not update current and previous routes unless monitorRoutes has been invoked', async(() => {

        router.navigate(['/dummy1'])
          .then(() => {
            expect(service.currentRoute).toBe('');
            expect(service.previousRoute).toBe('');
          });

      }));

      describe('when invoked', () => {

        beforeEach(() => {
          service.monitorRoutes();
        });

        it('should update current route with actual route on first navigation', async(() => {

          router.navigate(['/dummy1'])
            .then(() => {
              expect(service.currentRoute).toBe('/dummy1');
              expect(service.previousRoute).toBe('');
            });

        }));

        it('should update current route actual route and previous route with value of current route on 2nd naviagtion', async(() => {

          router.navigate(['/dummy1'])
            .then(() => {
              return router.navigate(['/dummy2']);
            })
            .then(() => {
              expect(service.currentRoute).toBe('/dummy2');
              expect(service.previousRoute).toBe('/dummy1');
            });

        }));

        it('should emit a subject with current and previous route', async(() => {

          const subscription: Subscription = service.stateChanges
            .subscribe((state: IStateChanges) => {
              expect(state.currentRoute).toBe('/dummy1');
              expect(state.previousRoute).toBe('');
              subscription.unsubscribe();
            });

          router.navigate(['/dummy1']);

        }));

      });

    });

    describe('navigateTo()', () => {

      it('should navigate to the given route', async(() => {

        service.navigateTo('/dummy1')
          .then(() => {
            expect(location.path()).toBe('/dummy1');
          });

      }));

    });

    describe('navigateBack', () => {

      it('should invoke window.history.back() when previous route is empty string', () => {

        spyOn(windowService.history, 'back');

        service.navigateBack();

        expect(windowService.history.back).toHaveBeenCalled();

      });

      it('should invoke navigateTo with previous route when it is present', () => {

        spyOn(service, 'navigateTo');
        (<any>service)._previousRoute = '/dummy1';

        service.navigateBack();

        expect(service.navigateTo).toHaveBeenCalledWith('/dummy1');

      });

    });

  });
});
