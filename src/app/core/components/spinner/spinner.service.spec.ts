import { Subject } from 'rxjs';

import { TestBed, inject } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('shared > services', () => {
  describe('SpinnerService', () => {

    let service: SpinnerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [SpinnerService]
      });
    });

    beforeEach(inject([SpinnerService], (spinnerService: SpinnerService) => {
      service = spinnerService;
    }));

    afterEach(() => {
      service['_requestQueue'] = [];
      service['_isSpinnerVisible'] = false;
    });

    describe('Initialization', () => {

      it('should initialize _requestQueue as an empty array', () => {
        expect(service['_requestQueue']).toEqual([]);
      });

      it('should initialize _isSpinnerVisible to false', () => {
        expect(service['_isSpinnerVisible']).toEqual(false);
      });

      it('should initialize _showSpinner$ as a Subject of type boolean', () => {
        expect(service['_showSpinner$']).toEqual(new Subject<boolean>());
      });

      it('should return the subject as an observable through showSpinner$', () => {
        expect(service.showSpinner$).toEqual(service['_showSpinner$'].asObservable());
      });

    });

    describe('requestSent()', () => {

      it('should do nothing if ignoreSpinner=true is not found', () => {

        service.requestSent('dummy?ignoreSpinner=true');
        expect(service['_requestQueue'].length).toBe(0);

      });

      it('should push the request to requestQueue if ignoreSpinner=true is not found', () => {

        service.requestSent('dummy');
        expect(service['_requestQueue'].length).toBe(1);

      });

      it('should set showSpinner to true and fire event if showSpinner is false and requestQueue.length is not 0', () => {

        spyOn(service['_showSpinner$'], 'next');

        service.requestSent('dummy');

        expect(service['_isSpinnerVisible']).toBe(true);
        expect(service['_showSpinner$'].next).toHaveBeenCalledWith(true);

      });

      it('should not fire event if showSpinner is already true', () => {

        service['_isSpinnerVisible'] = true;
        spyOn(service['_showSpinner$'], 'next');

        service.requestSent('dummy');

        expect(service['_isSpinnerVisible']).toBe(true);
        expect(service['_showSpinner$'].next).not.toHaveBeenCalled();

      });

    });

    describe('responseReceived()', () => {

      beforeEach(() => {
        service['_isSpinnerVisible'] = true;
        service['_requestQueue'] = ['dummy1', 'dummy2', 'dummy3'];
      });

      it('should do nothing if request is not found in _requestQueue', () => {

        service.responseReceived('dummy');

        expect(service['_isSpinnerVisible']).toEqual(true);
        expect(service['_requestQueue'].length).toBe(3);

      });

      it('should remove the url from requestQueue if found', () => {

        service.responseReceived('dummy2');

        expect(service['_requestQueue']).toEqual(['dummy1', 'dummy3']);

      });

      it('should set showSpinner to false and fire event if requestQueue.length is 0', () => {

        service['_requestQueue'] = ['dummy1'];
        spyOn(service['_showSpinner$'], 'next');

        service.responseReceived('dummy1');

        expect(service['_isSpinnerVisible']).toEqual(false);
        expect(service['_showSpinner$'].next).toHaveBeenCalledWith(false);

      });

    });

  });
});
