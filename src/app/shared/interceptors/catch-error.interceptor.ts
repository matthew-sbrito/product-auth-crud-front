import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ErrorResponse} from "../models/error-response.model";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error, caught) => {
        if(error instanceof HttpErrorResponse) {
          const apiError = error.error as ErrorResponse
          this.toastr.error(apiError.message, "Oppss!")
        }

        return throwError(error)
      })
    );
  }
}
