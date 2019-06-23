
import { TestBed, inject, async } from '@angular/core/testing';
import { SpinnerInterceptor } from './spinner.interceptor';
import { SpinnerService } from '../components/spinner/spinner.service';
import { HttpClientTestingModule, TestRequest, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

describe('shared > interceptors', () => {
  describe('SpinnerInterceptor', () => {

    let spinnerService: SpinnerService;
    let backend: HttpTestingController;
    let http: HttpClient;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          SpinnerService,
          {
            provide: HTTP_INTERCEPTORS,
            useClass: SpinnerInterceptor,
            multi: true
          }
        ]
      });
    });

    beforeEach(inject([SpinnerService, HttpTestingController, HttpClient],
      (spinnerInject: SpinnerService, mockBackend: HttpTestingController, httpClient: HttpClient) => {

        spinnerService = spinnerInject;
        backend = mockBackend;
        http = httpClient;

    }));

    beforeEach(() => {
      spyOn(spinnerService, 'requestSent').and.stub();
      spyOn(spinnerService, 'responseReceived').and.stub();
    });

    afterEach(() => {
      backend.verify();
    });

    describe('intercept()', () => {

      it('should invoke the interceptor and send an unmodified request is ignoreSpinner is absent', async(() => {

        http.get('dummy?x=x')
          .subscribe((data: string) => {
            expect(data).toEqual('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'GET',
          url: 'dummy?x=x'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

      }));

      it('should invoke the interceptor and strip the query ignoreSpinner=true', async(() => {

        http.get('dummy?x=x&ignoreSpinner=true')
          .subscribe((data: string) => {
            expect(data).toEqual('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'GET',
          url: 'dummy?x=x'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

      }));

      it('should invoke spinnerService.requestSent with the url', async(() => {

        http.get('dummy?ignoreSpinner=true')
          .subscribe((data: string) => {
            expect(data).toEqual('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'GET',
          url: 'dummy'
        });
        expect(spinnerService.requestSent).toHaveBeenCalledWith('dummy?ignoreSpinner=true');
        req.flush('dummyData', { status: 200, statusText: 'OK' });

      }));

      it('should invoke spinnerService.responseReceived with the url', async(() => {

        http.get('dummy?ignoreSpinner=true')
          .subscribe((data: string) => {
            expect(spinnerService.responseReceived)
              .toHaveBeenCalledWith('dummy?ignoreSpinner=true');
          });

        const req: TestRequest = backend.expectOne({
          method: 'GET',
          url: 'dummy'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

      }));

    });

  });
});
