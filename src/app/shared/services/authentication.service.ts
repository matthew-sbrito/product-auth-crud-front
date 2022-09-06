import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, switchMap, take, tap} from "rxjs";
import {ApplicationUser, AuthenticationResponse, LoginRequest, RegisterRequest} from "../models/authentication.model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

export type AuthenticationSubject = AuthenticationResponse | null;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private static USER_LOCAL_STORAGE_KEY : string = 'logged_user';

  private baseURL = environment.BASE_URL;

  private loggedUser: BehaviorSubject<AuthenticationSubject> = new BehaviorSubject<AuthenticationSubject>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) { }

  register(body: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post(`${this.baseURL}/user/register`, body).pipe(
      switchMap(value => {
        return this.login(body)
      }),
    );
  }

  login(body: LoginRequest): Observable<AuthenticationResponse> {
    return this.http.post(`${this.baseURL}/login`, body).pipe(
      map(value => AuthenticationResponse.fromApi({
        ...value,
        createIn: new Date().getTime() / 1000
      })),
      tap(value => this.setLoggedUser(value)),
      take(1)
    );
  }

  update(user: UpdateUserRequest) : Observable<ApplicationUser>{
    return this.http.put<ApplicationUser>(`${this.baseURL}/user/${user.id}`, {
      name: user.name,
      username: user.username,
    }).pipe(
      tap(value => {
        const loggedUser = this.getLoggedUser()!;
        loggedUser.user = value

        localStorage.setItem(
          AuthenticationService.USER_LOCAL_STORAGE_KEY, JSON.stringify(loggedUser)
        );

        this.loggedUser.next(loggedUser);
      })
    );
  }

  changePassword(body: UpdateUserRequest) : Observable<ApplicationUser>{
    return this.http.put<ApplicationUser>(`${this.baseURL}/user/password/${body.id}`, {
      oldPassword: body.oldPassword,
      newPassword: body.newPassword,
    });
  }

  setLoggedUser(auth: AuthenticationResponse): void {
    localStorage.setItem(
      AuthenticationService.USER_LOCAL_STORAGE_KEY, JSON.stringify(auth)
    );

    this.loggedUser.next(auth);

    this.router.navigate(['home']).then();
  }

  removeLoggedUser() {
    localStorage.removeItem(AuthenticationService.USER_LOCAL_STORAGE_KEY);
    this.loggedUser.next(null);
  }

  getLoggedUser(): AuthenticationSubject {
    if(this.loggedUser.value != null) return this.loggedUser.value;

    const cachedUserJSON = localStorage
      .getItem(AuthenticationService.USER_LOCAL_STORAGE_KEY)

    if(cachedUserJSON) {
      const cachedUser = JSON.parse(cachedUserJSON);

      const authenticationUser: AuthenticationResponse = AuthenticationResponse.fromApi(cachedUser);

      this.loggedUser.next(authenticationUser);

      return authenticationUser;
    }

    return null;
  }

  verifyTokenValid(): boolean {
    const auth = this.getLoggedUser();

    if(!auth) return false;

    const now = new Date().getTime() / 1000;
    const difference = now - auth.createIn;

    const valid = auth.expireIn > difference;

    if(!valid) {
      this.removeLoggedUser();
      this.toast.info("Sua sessão expirou!", "Info")
    }

    return valid;
  }

}

export interface UpdateUserRequest {
  id: number;
  name?: string;
  username?: string;
  oldPassword?: string;
  newPassword?: string;
}
