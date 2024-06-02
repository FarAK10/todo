// src/app/store/user/user.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthApiClient } from '../../core/services/auth.client';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RootRoutes } from '../../core/constants/routes';
import { ToastService } from '../../shared/components/toasts/services/toast.service';
import { IToast } from '../../shared/components/toasts/typings/toast.interface';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authApiClient: AuthApiClient,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap((action) =>
        this.authApiClient
          .login({ email: action.email, password: action.password })
          .pipe(
            map((response) =>
              UserActions.loginSuccess({
                userId: response.user_id,
                userName: response.username,
                token: response.token,
              })
            ),
            catchError((error) => of(UserActions.loginFailure({ error })))
          )
      )
    )
  );

  userLoginSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginSuccess),
      tap((action) => {
        this.authService.setAccessToken(action.token);
        const toast: IToast = {
          key: 'login_success',
          message: 'Successfully Logged In',
          type: 'success',
        };
        this.toastService.addToast(toast);
        this.router.navigate([RootRoutes.todos]);
      })
    ),
    { dispatch: false }
  );

  loginErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginFailure),
      tap((action) => {
        const toast: IToast = {
          key: 'login_error',
          message: action.error?.error?.message || action.error.message,
          type: 'error',
        };
        this.toastService.addToast(toast);
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logout),
        tap(() => this.authService.clearAccessToken())
      ),
    { dispatch: false }
  );
}
