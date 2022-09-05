import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService, AuthenticationSubject} from "../shared/services/authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.canDeactivate(request)) return next.handle(request);

    if(!this.authenticationService.verifyTokenValid()) {
      this.router.navigate(['login']).then(() => {

      });

      throw new Error("Token expirado!");
    }

    const token = this.retrieveToken();

    const newRequest = request.clone({
      headers: request.headers.set("Authorization", token)
    })

    return next.handle(newRequest).pipe();
  }

  canDeactivate(request: HttpRequest<unknown>): boolean {
    return ["login", "user/register"].some(path => request.url.includes(path));
  }

  retrieveToken() : string {
    const auth : AuthenticationSubject = this.authenticationService.getLoggedUser();

    return auth ? `Bearer ${auth.token}` : "";
  }
}
