import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authSerivce: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const currentUserToken = this.authSerivce.token;
    if (this.authSerivce.isLogged) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUserToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
