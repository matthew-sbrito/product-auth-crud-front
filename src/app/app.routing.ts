import {Routes} from "@angular/router";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AuthenticationGuard} from "./security/authentication.guard";

export const routes: Routes = [
  {path: 'login', component: LoginPageComponent, canActivate: [AuthenticationGuard]},
  {path: 'home', component: HomePageComponent, canActivate: [AuthenticationGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
