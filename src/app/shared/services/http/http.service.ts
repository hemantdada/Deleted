
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { HttpErrorHandlerService } from '../http-error-handler/http-error-handler.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

type Headers = HttpHeaders | { [headrs: string]: string | string[] };
type HttpObserve = 'body' | 'response' | 'events';
type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';
type Query = Object | string;
type Body = Object | string;
interface IJsonpRequestObject { url: string; callbackParam: string; }

interface IRequestOptions {
  body?: any;
  headers?: HttpHeaders;
  observe?: HttpObserve;
  reportProgress?: boolean;
  responseType?: ResponseType;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private httpErrorHandlerService: HttpErrorHandlerService) { }

  public jsonp<T>(url: string, callbackParam?: string): Observable<T> {
    const requestObject: IJsonpRequestObject = this.processJsonpUrl(url, callbackParam);
    return this.http.jsonp<T>(requestObject.url, requestObject.callbackParam)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.httpErrorHandlerService.handleCommonErrors(error);
        return throwError(error);
      }));
  }

  public request<T>(method: string, url: string, headers?: Headers, query?: Query, body?: Body,
    observe?: HttpObserve, responseType?: ResponseType): Observable<T> {

    const processedUrl: string = this.processQuery(url, query);
    const options: IRequestOptions = {
      headers: this.processHeaders(headers),
      body: this.processBody(body, headers),
      observe: observe,
      responseType: responseType || 'json',
      reportProgress: false
    };

    return this.http.request(method, processedUrl, options)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.httpErrorHandlerService.handleCommonErrors(error);
        return throwError(error);
      }));
  }

  public get<T>(url: string, headers?: Headers, query?: Query, responseType?: ResponseType): Observable<T> {
    return this.request<T>('GET', url, headers, query, undefined, 'body', responseType);
  }

  public post<T>(url: string, headers?: Headers, query?: Query, body?: Body, responseType?: ResponseType): Observable<T> {
    return this.request<T>('POST', url, headers, query, body, 'body', responseType);
  }

  public put<T>(url: string, headers?: Headers, query?: Query, body?: Body, responseType?: ResponseType): Observable<T> {
    return this.request<T>('PUT', url, headers, query, body, 'body', responseType);
  }

  public delete<T>(url: string, headers?: Headers, query?: Query, responseType?: ResponseType): Observable<T> {
    return this.request<T>('DELETE', url, headers, query, undefined, 'body', responseType);
  }


  public getWithResponse<T>(url: string, headers?: Headers, query?: Query, responseType?: ResponseType): Observable<HttpResponse<T>> {
    return this.request<HttpResponse<T>>('GET', url, headers, query, undefined, 'response', responseType);
  }

  public postWithResponse<T>(url: string, headers?: Headers, query?: Query, body?: Body,
    responseType?: ResponseType): Observable<HttpResponse<T>> {
    return this.request<HttpResponse<T>>('POST', url, headers, query, body, 'response', responseType);
  }

  public putWithResponse<T>(url: string, headers?: Headers, query?: Query, body?: Body,
    responseType?: ResponseType): Observable<HttpResponse<T>> {
    return this.request<HttpResponse<T>>('PUT', url, headers, query, body, 'response', responseType);
  }

  public deleteWithResponse<T>(url: string, headers?: Headers, query?: Query, responseType?: ResponseType): Observable<HttpResponse<T>> {
    return this.request<HttpResponse<T>>('DELETE', url, headers, query, undefined, 'response', responseType);
  }


  public getWithEvents<T>(url: string, headers?: Headers, query?: Query, responseType?: ResponseType): Observable<HttpEvent<T>> {
    return this.request<HttpEvent<T>>('GET', url, headers, query, undefined, 'events', responseType);
  }

  public postWithEvents<T>(url: string, headers?: Headers, query?: Query, body?: Body,
    responseType?: ResponseType): Observable<HttpEvent<T>> {
    return this.request<HttpEvent<T>>('POST', url, headers, query, body, 'events', responseType);
  }

  public putWithEvents<T>(url: string, headers?: Headers, query?: Query, body?: Body,
    responseType?: ResponseType): Observable<HttpEvent<T>> {
    return this.request<HttpEvent<T>>('PUT', url, headers, query, body, 'events', responseType);
  }

  public deleteWithEvents<T>(url: string, headers?: Headers, query?: Query, responseType?: ResponseType): Observable<HttpEvent<T>> {
    return this.request<HttpEvent<T>>('DELETE', url, headers, query, undefined, 'events', responseType);
  }


  private serialize(object: Object): HttpParams {
    let serializedObject: HttpParams = new HttpParams();
    for (const key in object) {
      const value: any = object[key];
      serializedObject = serializedObject.append(key, value);
    }
    return serializedObject;
  }

  private processJsonpUrl(url: string, callbackParam: string): IJsonpRequestObject {
    let requestObject: IJsonpRequestObject = <IJsonpRequestObject>{};
    if (callbackParam) {
      requestObject.url = url;
      requestObject.callbackParam = callbackParam;
    } else {
      requestObject = this.extractJsonpCallback(url);
    }

    return requestObject;
  }

  private extractJsonpCallback(url: string): IJsonpRequestObject {

    const requestObject: IJsonpRequestObject = <IJsonpRequestObject>{};
    const urlAndParams: Array<string> = url.split('?');

    requestObject.url = urlAndParams[0];

    const query: Array<string> = urlAndParams[1] ? urlAndParams[1].split('&') : ['callback=JSONP_CALLBACK'];

    query.forEach((param: string) => {
      if (param.indexOf('JSONP_CALLBACK') > -1) {
        requestObject.callbackParam = param.slice(0, param.indexOf('=JSONP_CALLBACK'));
      } else {
        requestObject.url = (requestObject.url.indexOf('?') > -1) ?
          (requestObject.url + '&' + param) : (requestObject.url + '?' + param);
      }
    });

    requestObject.callbackParam = requestObject.callbackParam ?
      requestObject.callbackParam : 'callback';

    return requestObject;

  }

  private processQuery(url: string, query: Query): string {

    if (query) {
      const queryString: HttpParams | string = typeof query === 'object' ? this.serialize(query) : query;
      url = (url.indexOf('?') > 0) ? url + '&' + queryString :
        url + '?' + queryString;
    }

    return url;

  }

  private processHeaders(headers: Headers): HttpHeaders {

    let requestHeaders: HttpHeaders;

    if (headers) {
      if (headers instanceof HttpHeaders) {
        requestHeaders = headers;
      } else {
        let httpHeaders: HttpHeaders = new HttpHeaders();
        for (const key in headers) {
          httpHeaders = httpHeaders.append(key, headers[key]);
        }
        requestHeaders = httpHeaders;
      }
    }

    return requestHeaders;

  }

  private processBody(body: Body, headers: Headers): Body {

    let requestBody: Body = body;

    if (body && headers && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      requestBody = (typeof body === 'object') ? this.serialize(body) : body;
    }

    return requestBody;

  }

}
