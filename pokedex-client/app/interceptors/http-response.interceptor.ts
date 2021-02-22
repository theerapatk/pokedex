import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  private isRefreshingToken = false;
  // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private toastrService: ToastrService,
    private authService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorStatus = errorResponse.status;
        let errorMessage = errorResponse.message;

        if (errorResponse && errorResponse.error) {
          errorStatus = errorResponse.error.error.status;
          errorMessage = errorResponse.error.error.message;

          const regex = new RegExp('(?=.*/api/).*');
          if (regex.test(request.url)) {
            return this.handleUnauthorizedError(errorResponse, request, next);
          }
        }

        const errorText = `Error Code: ${errorStatus}, Message: ${errorMessage}`;
        this.toastrService.error(errorText);
        return throwError(errorText);
      })
    );
  }


  private handleUnauthorizedError(errorResponse: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler) {
    const errorStatus = errorResponse.error.error.status;
    const errorMessage = errorResponse.error.error.message;
    if (errorStatus === 401) {
      if (this.isRefreshingToken) {
        // return this.refreshTokenSubject.pipe(
        //   filter(response => response != null),
        //   take(1),
        //   switchMap(response => {
        //     console.log('this.refreshTokenSubject.pipe:request  ' + request);
        //     console.log('this.refreshTokenSubject.pipe:response  ' + response);
        //     return next.handle(request);
        //   })
        // );
        return next.handle(request);
      } else {
        this.isRefreshingToken = true;
        // this.refreshTokenSubject.next(null);

        return this.authService.refreshToken().pipe(
          switchMap((response: any) => {
            // this.refreshTokenSubject.next(response);
            return next.handle(request.clone({
              setHeaders: { 'Authorization': `Bearer ${response.accessToken}` }
            }));
          }),
          finalize(() => this.isRefreshingToken = false)
        );
      }
    } else {
      const errorText = `Error Code: ${errorStatus}, Message: ${errorMessage}`;
      this.toastrService.error(errorText);
      return throwError(errorText);
    }
  }
}
