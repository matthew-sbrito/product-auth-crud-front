import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../shared/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(state.url == '/login') {
      return this.validateCanLoginPage();
    }

    return this.validateCanAccessSystem();
  }

  validateCanLoginPage(): boolean {
    if (this.authenticationService.verifyTokenValid()) {
      console.log("here")

      this.router.navigate(["home"]).then(() => {

      });

      return false;
    }

    return true;
  }

  validateCanAccessSystem(): boolean {
    if (!this.authenticationService.verifyTokenValid()) {
      this.router.navigate(["login"]).then(() => {

      });

      return false;
    }

    return true;
  }


}
