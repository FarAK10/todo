// src/app/store/user/user.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '.';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserId = createSelector(
  selectUserState,
  (state: UserState) => state.userId
);

export const selectUserName = createSelector(
  selectUserState,
  (state: UserState) => state.userName
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
