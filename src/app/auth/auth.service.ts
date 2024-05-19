import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
//the format of data we receive after post request
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  //this type of subject will have access to the previously emitted values even if they haven't subscribed at point that value was emitted
  user = new BehaviorSubject<User>(null);
  private tokenExpTimer:any;

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
        { email, password, returnSecureToken: true } //firebase auth api accepts this object for authentication
      )
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn //this expiration time will be in seconds
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      //expDuration = token expiration date in miliseconds - current date in miliseconds
      const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
    }
  }
  autoLogout(expirationDuration: number) {
   this.tokenExpTimer= setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpTimer){
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expiratoinDate = new Date(new Date().getTime() + +expiresIn * 1000); //expration time in seconds to miliseconds and then adding it to the current time
    const user = new User(email, userId, token, expiratoinDate);
    this.user.next(user);
    //As each time page reloads the variables will be destroyed from memory but we want our user data to be stored until it didnt logout
    //so we use localstorage to store our user object and JSON.stringify() to convert it to string bcz local storage stores key:value in string
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn*1000);
  }
}
