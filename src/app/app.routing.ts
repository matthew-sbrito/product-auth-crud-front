import {Routes} from "@angular/router";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AuthenticationGuard} from "./security/authentication.guard";
import {ProductListComponent} from "./components/product/product-list/product-list.component";
import {UserComponent} from "./components/user/user.component";

export const routes: Routes = [
  {path: 'login', component: LoginPageComponent, canActivate: [AuthenticationGuard]},
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {path: '', component: ProductListComponent},
      {path: 'user', component: UserComponent}
    ]
  },
];
