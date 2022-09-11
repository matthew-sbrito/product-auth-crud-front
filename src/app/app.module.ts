import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AuthenticationGuard} from "./security/authentication.guard";
import {AuthenticationInterceptor} from "./security/authentication.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginPageComponent} from './components/login-page/login-page.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {routes} from "./app.routing";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import { LoadingDialogComponent } from './shared/components/loading-dialog/loading-dialog.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {StaticInjector} from "./shared/common/static-injector";
import {ConfirmationDialogComponent} from "./shared/components/confirmation-dialog/confirmation-dialog.component";
import {ConfirmableService} from "./shared/common/confirmable/confirmable.model";
import {ConfirmationDialogService} from "./shared/services/confirmation-dialog.service";
import {ProductListComponent} from "./components/product/product-list/product-list.component";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import { ProductDialogComponent } from './components/product/product-dialog/product-dialog.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import { UserComponent } from './components/user/user.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {LoadingInterceptor} from "./shared/interceptors/loading.interceptor";
import {CatchErrorInterceptor} from "./shared/interceptors/catch-error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    LoadingDialogComponent,
    ConfirmationDialogComponent,
    ProductListComponent,
    ProductDialogComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    FormsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-right', progressBar: true })
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    {
      provide: ConfirmableService,
      useClass: ConfirmationDialogService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    StaticInjector.injector = injector
  }
}
