import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable, inject } from '@angular/core';
import { map, take } from 'rxjs';

Injectable({ providedIn: 'root' });

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  //dont use inject(AuthService).user.pipe() it wont work instead store it in variables and then use them
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),//this make sure we always take the latest user value & it will auto unsubscribe the observable
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      //it will omit the existing url and create a new localhost:PORT/auth url
      return router.createUrlTree(['/auth']);
    })
  );
};
