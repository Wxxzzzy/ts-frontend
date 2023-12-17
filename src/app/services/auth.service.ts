import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { envDev } from '../../environments';
import {
  Credentials,
  RegistrationCredentials,
  UserAccessData,
} from '../shared';
import { RequestNotificationService } from './request-notification.service';

//TODO: Do something with hardcoded value names
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _baseUrl = `${envDev.baseUrl}/Authentication`;

  //TODO: observable userData (get rid of getters)

  constructor(
    private http: HttpClient,
    private router: Router,
    private notify: RequestNotificationService,
  ) {}

  public get isLogged(): boolean {
    return this.token !== null;
  }

  public get userId(): number {
    return Number(localStorage.getItem('userId')) ?? 0;
  }

  public get username(): string | null {
    return localStorage.getItem('username');
  }

  public get userRoleId(): number {
    return Number(localStorage.getItem('user_role_id')) ?? 0;
  }

  public get token(): string {
    const token = localStorage.getItem('token');
    return token ?? 'no token';
  }

  public login(loginData: Credentials): Observable<UserAccessData> {
    return this.http
      .post<UserAccessData>(`${this._baseUrl}/login`, loginData)
      .pipe(
        tap((v) => {
          this.setValuesToLocalStorage(v);
          this.router.navigate(['user-page']);
          this.notify.success('You logged in');
        }),
      );
  }

  //TODO: avoid any
  //TODO: maybe should use first() or something like that?
  public logout(): Observable<any> {
    return this.http.post(`${this._baseUrl}/logout`, this.token).pipe(
      tap(() => {
        localStorage.clear();
        this.router.navigate(['/']);
        this.notify.success('You logged out');
      }),
    );
  }

  public register(
    signUpData: RegistrationCredentials,
  ): Observable<UserAccessData> {
    return this.http
      .post<UserAccessData>(`${this._baseUrl}/register`, signUpData)
      .pipe(
        tap((v) => {
          this.setValuesToLocalStorage(v);
          this.router.navigate(['/user-page']);
        }),
      );
  }

  public refreshToken(): Observable<UserAccessData> {
    return this.http.get<UserAccessData>(`${this._baseUrl}/token`).pipe(
      tap((v) => {
        localStorage.clear();
        this.setValuesToLocalStorage(v);
      }),
    );
  }

  private setValuesToLocalStorage(values: UserAccessData) {
    localStorage.setItem('user_id', values.id.toString());
    localStorage.setItem('username', values.username);
    localStorage.setItem('user_role_id', values.userRoleId.toString());
    localStorage.setItem('token', values.token);
  }
}
