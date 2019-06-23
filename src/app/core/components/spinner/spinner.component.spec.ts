
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerInterceptor } from '../../interceptors/spinner.interceptor';
import { SpinnerService } from './spinner.service';
import { Subject } from 'rxjs';

describe('shared > components', () => {
  describe('SpinnerComponent', () => {

    let component: SpinnerComponent;
    let fixture: ComponentFixture<SpinnerComponent>;
    let spinnerService: SpinnerService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [SpinnerComponent],
        providers: [SpinnerService, SpinnerInterceptor]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SpinnerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(inject([SpinnerService], (spinnerInject: SpinnerService) => {
      spinnerService = spinnerInject;
    }));

    describe('Initialization', () => {

      it('should initialize showSpinner to false', () => {
        expect(component.showSpinner).toBe(false);
      });

      it('should subscribe to spinnerService.showSpinner$', () => {
        expect(typeof component['_spinnerSubscription'])
          .toEqual(typeof spinnerService.showSpinner$.subscribe());
      });

      it('should update the value of showSpinner with value in spinnerSubscription', fakeAsync(() => {

        spinnerService['_showSpinner$'].next(true);
        tick();

        expect(component.showSpinner).toBe(true);

      }));

    });

    describe('ngOnDestroy()', () => {

      it('should unsubscribe to _spinnerSubscription if it is defined', () => {

        component['_spinnerSubscription'] = new Subject<any>().subscribe();
        spyOn(component['_spinnerSubscription'], 'unsubscribe').and.callThrough();

        // tslint:disable-next-line:no-life-cycle-call
        component.ngOnDestroy();

        expect(component['_spinnerSubscription'].unsubscribe).toHaveBeenCalled();

      });

      it('should do nothing if _spinnerSubscription is undefined', () => {

        component['_spinnerSubscription'] = undefined;

        // tslint:disable-next-line:no-life-cycle-call
        component.ngOnDestroy();

        expect(component['_spinnerSubscription']).toBeUndefined();

      });

    });

  });
});
