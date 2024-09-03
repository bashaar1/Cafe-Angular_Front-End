import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token != null) {
      const clonedRequest = request.clone({
        headers: request.headers.append("Authorization", `Bearer ${token}`)
      });
      return next.handle(clonedRequest);
    }
    return next.handle(request).pipe(catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        console.log(err.url)
        if (err.status === 401 || err.status === 403) {
          if (this.router.url === '/') { }
          else {
            localStorage.clear();
            this.router.navigate(['/'])
          }
        }
      }
      return throwError(err);
    }));
  }
}