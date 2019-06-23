
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse, HttpHeaders, HttpResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { HttpService } from './http.service';
import { HttpErrorHandlerService } from '../http-error-handler/http-error-handler.service';
import { Observable } from 'rxjs';

describe('shared > services', () => {
  describe('HttpService', () => {

    class Test { public body: string; }

    let service: HttpService, backend: HttpTestingController, httpErrorHandler: HttpErrorHandlerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          HttpClientTestingModule
        ],
        providers: [HttpErrorHandlerService, HttpService]
      }).compileComponents();
    });

    beforeEach(inject([HttpService, HttpTestingController, HttpErrorHandlerService],
      (httpService: HttpService, mockBackend: HttpTestingController,
        errorHandler: HttpErrorHandlerService) => {

        service = httpService;
        backend = mockBackend;
        httpErrorHandler = errorHandler;

      }));

    afterEach(() => {
      backend.verify();
    });

    // Testing using POST since it covers all arguments.
    describe('request()', () => {

      it('should invoke httpClient.request with given arguments', async(() => {

        service.request('POST', 'dummyUrl', { headers: 'headers' }, 'query=query', { body: 'body' })
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl?query=query'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

        expect(req.request.body).toEqual({ body: 'body' });
        expect(req.request.headers.get('headers')).toBe('headers');

      }));

      it('should invoke the error handler if request fails', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.request('POST', 'dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

      it('should make a post request when only url is present', async(() => {

        service.request('POST', 'dummyUrl')
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

      }));

      it('should make a post request when only url and headers are present', async(() => {

        service.request('POST', 'dummyUrl', { headers: 'headers' })
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

        expect(req.request.headers.get('headers')).toEqual('headers');

      }));

      it('should make a post request when only url and headers as HttpHeaders are present', async(() => {

        service.request('POST', 'dummyUrl', new HttpHeaders({ headers: 'headers' }))
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

        expect(req.request.headers.get('headers')).toEqual('headers');

      }));

      it('should make a post request when url, headers, and query string as object are present', async(() => {

        service.request('POST', 'dummyUrl', { headers: 'headers' }, { query1: 'query1', query2: 'query2' })
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl?query1=query1&query2=query2'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

        expect(req.request.headers.get('headers')).toEqual('headers');

      }));

      it('should make a post request when query string is a string', async(() => {

        service.request('POST', 'dummyUrl?x=y', { headers: 'headers' }, 'query=query')
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl?x=y&query=query'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

        expect(req.request.headers.get('headers')).toEqual('headers');

      }));

      it('should make a post request when url contains a query string', async(() => {

        service.request('POST', 'dummyUrl?x=y', { headers: 'headers' }, { query: 'query' })
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl?x=y&query=query'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

        expect(req.request.headers.get('headers')).toEqual('headers');

      }));

      it('should make a post request with given body when data is present', async(() => {

        service.request('POST', 'dummyUrl?x=y', { headers: 'headers' }, { query: 'query' }, { data: 'data' })
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl?x=y&query=query'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

        expect(req.request.body).toEqual({ data: 'data' });
        expect(req.request.headers.get('headers')).toEqual('headers');

      }));

      it('should make a post request after encoding body when header is {Content-Type: application/x-www-form-urlencoded}', async(() => {

        let body: HttpParams = new HttpParams();
        body = body.append('data1', 'data1');
        body = body.append('data2', 'data2');

        service.request('POST', 'dummyUrl', { 'Content-Type': 'application/x-www-form-urlencoded' },
          undefined, { data1: 'data1', data2: 'data2' })
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

        expect(req.request.headers.get('Content-Type')).toEqual('application/x-www-form-urlencoded');
        expect(req.request.body).toEqual(body);

      }));

      it('should make a post request with encoded body when header is {Content-Type: application/x-www-form-urlencoded}', async(() => {

        service.request('POST', 'dummyUrl', { 'Content-Type': 'application/x-www-form-urlencoded' }, undefined, 'body=body')
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

        expect(req.request.headers.get('Content-Type')).toEqual('application/x-www-form-urlencoded');
        expect(req.request.body).toEqual('body=body');

      }));

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.request('POST', 'dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

      it('should return the response body having given type', async(() => {

        service.request<Test>('POST', 'dummyUrl')
          .subscribe((res: Test) => {
            expect(typeof res).toEqual(typeof new Observable<Test>());
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush({ body: 'body' }, { status: 200, statusText: 'Ok' });

      }));

    });

    describe('jsonp()', () => {

      it('should invoke a jsonp request through httpClient when callback param is present', async(() => {

        service.jsonp<any>('dummyUrl', 'callbackParam')
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'JSONP',
          url: 'dummyUrl?callbackParam=JSONP_CALLBACK'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

      }));

      it('should invoke a jsonp request through httpClient when callback param is embeded in url', async(() => {

        service.jsonp<any>('dummyUrl?callbackParam=JSONP_CALLBACK')
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'JSONP',
          url: 'dummyUrl?callbackParam=JSONP_CALLBACK'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

      }));

      it('should invoke a jsonp request through httpClient when callback param is embeded in url with other query params', async(() => {

        service.jsonp<any>('dummyUrl?query1=query1&callbackParam=JSONP_CALLBACK&query2=query2')
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'JSONP',
          url: 'dummyUrl?query1=query1&query2=query2&callbackParam=JSONP_CALLBACK'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

      }));

      it('should invoke a jsonp request through httpClient when callback param it is not specified', async(() => {

        service.jsonp<any>('dummyUrl')
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'JSONP',
          url: 'dummyUrl?callback=JSONP_CALLBACK'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

      }));

      it('should invoke a jsonp request when callback param it is not specified but url contains a query', async(() => {

        service.jsonp<any>('dummyUrl?query=query')
          .subscribe((data: any) => {
            expect(data).toBe('dummyData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'JSONP',
          url: 'dummyUrl?query=query&callback=JSONP_CALLBACK'
        });
        req.flush('dummyData', { status: 200, statusText: 'OK' });

      }));

      it('should invoke the error handler if request fails', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.jsonp('dummyUrl', 'callback')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl?callback=JSONP_CALLBACK',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'JSONP',
          url: 'dummyUrl?callback=JSONP_CALLBACK'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    // Testing only wiring and return type for body methods to reduce redundancy.
    describe('get()', () => {

      it('should invoke request with a get request and given arguments and observe body', () => {

        spyOn(service, 'request');

        service.get<any>('dummyUrl', { headers: 'headers' }, 'query=query');

        expect(service.request)
          .toHaveBeenCalledWith('GET', 'dummyUrl', { headers: 'headers' }, 'query=query', undefined, 'body', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.get<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new Observable<Test>());
            expect(data.body).toBe('someData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'GET',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.get('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'GET',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    describe('post()', () => {

      it('should invoke request with a post request and given arguments and observe body', () => {

        spyOn(service, 'request');

        service.post<any>('dummyUrl', { headers: 'headers' }, 'query=query', 'body');

        expect(service.request)
          .toHaveBeenCalledWith('POST', 'dummyUrl', { headers: 'headers' }, 'query=query', 'body', 'body', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.post<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new Observable<Test>());
            expect(data.body).toBe('someData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.post('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    describe('put()', () => {

      it('should invoke request with a put request and given arguments and observe body', () => {

        spyOn(service, 'request');

        service.put<any>('dummyUrl', { headers: 'headers' }, 'query=query', 'body');

        expect(service.request)
          .toHaveBeenCalledWith('PUT', 'dummyUrl', { headers: 'headers' }, 'query=query', 'body', 'body', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.put<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new Observable<Test>());
            expect(data.body).toBe('someData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'PUT',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.put('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'PUT',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    describe('delete()', () => {

      it('should invoke request with a delete request and given arguments and observe body', () => {

        spyOn(service, 'request');

        service.delete<any>('dummyUrl', { headers: 'headers' }, 'query=query');

        expect(service.request)
          .toHaveBeenCalledWith('DELETE', 'dummyUrl', { headers: 'headers' }, 'query=query', undefined, 'body', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.delete<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new Observable<Test>());
            expect(data.body).toBe('someData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'DELETE',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.delete('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'DELETE',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    // Testing only wiring and return type for response methods to reduce redundancy.
    describe('getWithResponse()', () => {

      it('should invoke request with a get request and given arguments and observe response', () => {

        spyOn(service, 'request');

        service.getWithResponse<any>('dummyUrl', { headers: 'headers' }, 'query=query');

        expect(service.request)
          .toHaveBeenCalledWith('GET', 'dummyUrl', { headers: 'headers' }, 'query=query', undefined, 'response', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.getWithResponse<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new HttpResponse<Test>());
            expect(data.body.body).toBe('someData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'GET',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.getWithResponse('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'GET',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    describe('postWithResponse()', () => {

      it('should invoke request with a post request and given arguments and observe response', () => {

        spyOn(service, 'request');

        service.postWithResponse<any>('dummyUrl', { headers: 'headers' }, 'query=query', 'body');

        expect(service.request)
          .toHaveBeenCalledWith('POST', 'dummyUrl', { headers: 'headers' }, 'query=query', 'body', 'response', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.postWithResponse<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new HttpResponse<Test>());
            expect(data.body.body).toBe('someData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.postWithResponse('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    describe('putWithResponse()', () => {

      it('should invoke request with a put request and given arguments and observe response', () => {

        spyOn(service, 'request');

        service.putWithResponse<any>('dummyUrl', { headers: 'headers' }, 'query=query', 'body');

        expect(service.request)
          .toHaveBeenCalledWith('PUT', 'dummyUrl', { headers: 'headers' }, 'query=query', 'body', 'response', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.putWithResponse<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new HttpResponse<Test>());
            expect(data.body.body).toBe('someData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'PUT',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.putWithResponse('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'PUT',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    describe('deleteWithResponse()', () => {

      it('should invoke request with a delete request and given arguments and observe response', () => {

        spyOn(service, 'request');

        service.deleteWithResponse<any>('dummyUrl', { headers: 'headers' }, 'query=query');

        expect(service.request)
          .toHaveBeenCalledWith('DELETE', 'dummyUrl', { headers: 'headers' }, 'query=query', undefined, 'response', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.deleteWithResponse<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new HttpResponse<Test>());
            expect(data.body.body).toBe('someData');
          });

        const req: TestRequest = backend.expectOne({
          method: 'DELETE',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.deleteWithResponse('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'DELETE',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    // Testing only wiring and return type for events methods to reduce redundancy.
    describe('getWithEvents()', () => {

      it('should invoke request with a get request and given arguments and observe response', () => {

        spyOn(service, 'request');

        service.getWithEvents<any>('dummyUrl', { headers: 'headers' }, 'query=query');

        expect(service.request)
          .toHaveBeenCalledWith('GET', 'dummyUrl', { headers: 'headers' }, 'query=query', undefined, 'events', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.getWithEvents<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new Observable<HttpEvent<Test>>());
          });

        const req: TestRequest = backend.expectOne({
          method: 'GET',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.getWithEvents('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'GET',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    describe('postWithEvents()', () => {

      it('should invoke request with a post request and given arguments and observe response', () => {

        spyOn(service, 'request');

        service.postWithEvents<any>('dummyUrl', { headers: 'headers' }, 'query=query', 'body');

        expect(service.request)
          .toHaveBeenCalledWith('POST', 'dummyUrl', { headers: 'headers' }, 'query=query', 'body', 'events', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.postWithEvents<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new Observable<HttpEvent<Test>>());
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.postWithEvents('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'POST',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    describe('putWithEvents()', () => {

      it('should invoke request with a put request and given arguments and observe response', () => {

        spyOn(service, 'request');

        service.putWithEvents<any>('dummyUrl', { headers: 'headers' }, 'query=query', 'body');

        expect(service.request)
          .toHaveBeenCalledWith('PUT', 'dummyUrl', { headers: 'headers' }, 'query=query', 'body', 'events', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.putWithEvents<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new Observable<HttpEvent<Test>>());
          });

        const req: TestRequest = backend.expectOne({
          method: 'PUT',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.putWithEvents('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'PUT',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

    describe('deleteWithEvents()', () => {

      it('should invoke request with a delete request and given arguments and observe response', () => {

        spyOn(service, 'request');

        service.deleteWithEvents<any>('dummyUrl', { headers: 'headers' }, 'query=query');

        expect(service.request)
          .toHaveBeenCalledWith('DELETE', 'dummyUrl', { headers: 'headers' }, 'query=query', undefined, 'events', undefined);

      });

      it('should return an observalbe of given type', () => {

        service.deleteWithEvents<Test>('dummyUrl')
          .subscribe((data: any) => {
            expect(typeof data).toBe(typeof new Observable<HttpEvent<Test>>());
          });

        const req: TestRequest = backend.expectOne({
          method: 'DELETE',
          url: 'dummyUrl'
        });
        req.flush({ body: 'someData' }, { status: 200, statusText: 'OK' });

      });

      it('should invoke httpErrorHandler and re-throw Observable error when backend throws an error', async(() => {

        spyOn(httpErrorHandler, 'handleCommonErrors');

        service.deleteWithEvents('dummyUrl')
          .subscribe(() => {
            // Nothing to do here for error scenario.
          }, (error: Error) => {
            expect(httpErrorHandler.handleCommonErrors).toHaveBeenCalledWith(new HttpErrorResponse({
              status: 500,
              statusText: 'Failed',
              url: 'dummyUrl',
              error: 'Internal Server Error'
            }));
          });

        const req: TestRequest = backend.expectOne({
          method: 'DELETE',
          url: 'dummyUrl'
        });
        req.flush('Internal Server Error', { status: 500, statusText: 'Failed' });

      }));

    });

  });
}); // tslint:disable-line:max-file-line-count
