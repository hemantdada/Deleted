
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorHandlerService } from './http-error-handler.service';

describe('shared > services', () => {
  describe('HttpErrorHandlerService', () => {

    let service: HttpErrorHandlerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [HttpErrorHandlerService]
      });
    });

    beforeEach(inject([HttpErrorHandlerService], (errorHandler: HttpErrorHandlerService) => {
      service = errorHandler;
    }));

    describe('handleCommonErrors()', () => {

      it('should log the error message for status code 404', async(() => {

        spyOn(console, 'log');

        service.handleCommonErrors(new HttpErrorResponse({
          status: 404,
          statusText: 'Failed',
          url: 'dummyUrl',
          error: 'Not Found'
        }));

        expect(console.log).toHaveBeenCalledWith('Http failure response for dummyUrl: 404 Failed');

      }));

      it('should log the error message for status code 500', async(() => {

        spyOn(console, 'log');

        service.handleCommonErrors(new HttpErrorResponse({
          status: 500,
          statusText: 'Failed',
          url: 'dummyUrl',
          error: 'Internal Server Error'
        }));

        expect(console.log).toHaveBeenCalledWith('Http failure response for dummyUrl: 500 Failed');

      }));

      it('should do nothing for other status codes', async(() => {

        spyOn(console, 'log');

        service.handleCommonErrors(new HttpErrorResponse({
          status: 100,
          statusText: 'Failed',
          url: 'dummyUrl',
          error: 'Unknown error'
        }));

        expect(console.log).not.toHaveBeenCalled();


      }));

    });

  });
}); // tslint:disable-line:max-file-line-count
