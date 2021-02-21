import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

    constructor(private toastrService: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                let errorStatus = errorResponse.status;
                let errorMessage = errorResponse.message;

                if (errorResponse && errorResponse.error) {
                    errorStatus = errorResponse.error.error.status;
                    errorMessage = errorResponse.error.error.message;
                }

                const errorText = `Error Code: ${errorStatus}, Message: ${errorMessage}`;
                this.toastrService.error(errorText);
                return throwError(errorText);
            })
        );
    }

}
