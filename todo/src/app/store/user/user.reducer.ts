// src/app/store/user/user.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from '.';
const initialState: UserState = {
  userId: null,
  userName: null,
  error: null,
};
export const userReducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, { userId, userName }) => ({
    ...state,
    userId,
    userName,
    error: null,
  })),
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.logout, (state) => ({
    ...state,
    userId: null,
    userName: null,
  }))
);
