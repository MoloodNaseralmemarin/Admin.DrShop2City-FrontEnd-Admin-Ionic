import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterUserViewModel } from './../DTOs/Account/RegisterUserViewModel';
import { LoginUserViewModel } from './../DTOs/Account/LoginUserViewModel';
import { ILoginUserAccount } from '../DTOs/Account/ILoginUserAccount';
import { CurrentUser } from '../DTOs/Account/CurrentUser';
import { ICheckUserAuthResult } from '../DTOs/Account/ICheckUserAuthResult';
import { EditUserViewModel } from '../DTOs/Account/EditUserViewModel';
import { IResponseResult } from '../DTOs/Common/IResponseResult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private currentUser: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(null);

  constructor(
    private http: HttpClient
  ) {
  }

  setCurrentUser(user: CurrentUser): void {
    this.currentUser.next(user);
    this.loggedIn = user !== null;
  }


  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return promise;
  }
  getCurrentUser(): Observable<CurrentUser> {
    return this.currentUser;
  }

  loginUser(loginUserDTO: LoginUserViewModel): Observable<ILoginUserAccount> {
    return this.http.post<ILoginUserAccount>('/AdminAccount/login', loginUserDTO);
  }

  checkUserAuth(): Observable<ICheckUserAuthResult> {
    return this.http.post<ICheckUserAuthResult>('/Account/check-auth', null);
  }

  checkAdminAuth(): Observable<ICheckUserAuthResult> {
    return this.http.post<ICheckUserAuthResult>('/AdminAccount/check-admin-auth', null);
  }
  logOutUser(): Observable<any> {
    return this.http.get('/AdminAccount/sign-out');
  }
}

