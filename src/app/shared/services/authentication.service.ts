import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, switchMap, take, tap} from "rxjs";
import {AuthenticationResponse, LoginRequest, RegisterRequest} from "../models/authentication.model";
import {Router} from "@angular/router";

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
    private router: Router
  ) { }

  register(body: RegisterRequest): Observable<AuthenticationResponse> {
    console.log("here")
    console.log(body)

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
        createIn: new Date().getTime()
      })),
      tap(value => this.setLoggedUser(value)),
      take(1)
    );
  }

  setLoggedUser(auth: AuthenticationResponse): void {
    localStorage.setItem(
      AuthenticationService.USER_LOCAL_STORAGE_KEY, JSON.stringify(auth)
    );

    this.loggedUser.next(auth);

    this.router.navigate(['home']).then(

    );
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

    const now = new Date().getTime();
    const expireIn = auth.expireIn + auth.createIn;

    const valid = now < expireIn;

    if(!valid) this.removeLoggedUser();

    return valid;
  }

}
