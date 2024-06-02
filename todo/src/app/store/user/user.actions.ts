// src/app/store/user/user.actions.ts

import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[User] Login',
  props<{ email: string; password: number }>()
);
export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ userId: number; userName: string, token:string }>()
);
export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: any }>()
);
export const logout = createAction('[User] Logout');
