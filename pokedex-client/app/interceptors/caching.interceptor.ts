import {
    HttpEvent,
    HttpHandler, HttpHeaders,
    HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { pokeApiUrl } from '../services/pokedex.service';
import { RequestCache } from '../services/request-cache.service';

/**
 * If request is cacheable (e.g., package search) and
 * response is in cache return the cached response as observable.
 * If has 'x-refresh' header that is true,
 * then also re-run the package search, using response from next(),
 * returning an observable that emits the cached response first.
 *
 * If not in cache or not cacheable,
 * pass request through to next()
 */
@Injectable()
export class CachingInterceptor implements HttpInterceptor {

    constructor(private cache: RequestCache) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // continue if not cacheable.
        // return next.handle(request);
        if (!isCacheable(request)) { return next.handle(request); }

        const cachedResponse = this.cache.get(request);
        // cache-then-refresh
        if (request.headers.get('x-refresh')) {
            const results$ = sendRequest(request, next, this.cache);
            return cachedResponse ?
                results$.pipe(startWith(cachedResponse)) :
                results$;
        }
        // cache-or-fetch
        return cachedResponse ?
            of(cachedResponse) : sendRequest(request, next, this.cache);
    }
}

/** Is this request cacheable? */
function isCacheable(request: HttpRequest<any>): boolean {
    // Only GET requests are cacheable
    if (request.url.indexOf('https://raw.githubusercontent.com/PokeAPI/sprites') === 0) {
        console.log(request.url);
    }
    return request.method === 'GET' &&
        // Only npm package search is cacheable in this app
        -1 < request.url.indexOf(pokeApiUrl);
}

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache): Observable<HttpEvent<any>> {

    // No headers allowed in npm search request
    const noHeaderReq = req.clone({ headers: new HttpHeaders() });

    return next.handle(noHeaderReq).pipe(
        tap(event => {
            // There may be other events besides the response.
            if (event instanceof HttpResponse) {
                cache.put(req, event); // Update the cache.
            }
        })
    );
}



/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
