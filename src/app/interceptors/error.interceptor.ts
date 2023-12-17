import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RequestNotificationService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notifyService: RequestNotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // tap(() => {
      //   this.notifyService.success('Success');
      // }),
      catchError((x: HttpErrorResponse) => {
        return this.handleError(x);
      }),
    );
  }

  private handleError(err: HttpErrorResponse) {
    const message = err.error?.Error as string;
    switch (err.status) {
      case 400:
        this.notifyService.error(message ?? 'Failed');
        break;
      case 401:
        this.notifyService.error(message ?? 'User is not authorized');
        break;
      case 403:
        this.notifyService.error(message ?? 'You have no permissions');
        break;
      case 404:
        this.notifyService.error(message ?? 'Not found');
        break;
      default:
        this.notifyService.error(message ?? 'Request failed');
        break;
    }

    return throwError(() => err);
  }
}
