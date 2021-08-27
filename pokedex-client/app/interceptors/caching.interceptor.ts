import {
  HttpEvent,
  HttpHandler, HttpHeaders,
  HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCache } from '../services/request-cache.service';

// https://github.com/angular/angular/blob/master/aio/content/examples/http/src/app/http-interceptors/caching-interceptor.ts
@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!isCacheable(request)) return next.handle(request)
    const cachedResponse = this.cache.get(request);
    return cachedResponse ? of(cachedResponse) : sendRequest(request, next, this.cache);
  }

}

function isCacheable(request: HttpRequest<any>): boolean {
  return request.method === 'GET' && (request.url.includes('https://pokeapi.co/api/v2/') ||
    request.url.includes('raw.githubusercontent.com/PokeAPI/sprites/'));
}

function sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: RequestCache): Observable<HttpEvent<any>> {
  const noHeaderReq = req.clone({ headers: new HttpHeaders() });
  return next.handle(noHeaderReq).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.put(req, event);
      }
    })
  );
}



/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
