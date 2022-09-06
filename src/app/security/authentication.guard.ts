import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../shared/services/authentication.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toast: ToastrService
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
      this.router.navigate(["home"]).then(() => {
        this.toast.error("Você já está logado!", "Oppss!")
      });

      return false;
    }

    return true;
  }

  validateCanAccessSystem(): boolean {
    if (!this.authenticationService.verifyTokenValid()) {
      this.router.navigate(["login"]).then(() => {
        this.toast.error("Realize o login para acessar o sistema!", "Oppss!")
      });

      return false;
    }

    return true;
  }


}
