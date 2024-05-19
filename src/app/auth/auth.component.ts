import { Component, NgModule, ViewChild, createComponent } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({ selector: 'app-auth', templateUrl: './auth.component.html' })
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    //declared an observable to store the observable for login and signup
    let authObs: Observable<AuthResponseData>;

    if (form.invalid) {
      return;
    }
    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    //subscribing the observable returned by auth.service
    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      error: (errorRes) => {
        // console.log(errorRes)
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS': {
            this.error = 'The email already exists!';
            // this.showErrorAlert('The email already exists!');
            break;
          }
          case 'INVALID_PASSWORD': {
            this.error = 'The password is invalid!';
            // this.showErrorAlert('The password is invalid!');
            break;
          }
          case 'INVALID_LOGIN_CREDENTIALS': {
            this.error = 'Invalid login credentials!';
            // this.showErrorAlert('Invalid login credentials!');
            break;
          }
        }
        //   this.error = 'An error Occurred';
        this.isLoading = false;
      },
    });

    form.reset();
  }
  onHandleError() {
    this.error = null;
  }
}
