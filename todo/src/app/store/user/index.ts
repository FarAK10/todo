export interface UserState {
  userId: number | null;
  userName: string | null;
  error: any | null;
}

export * from './user.actions';
export * from './user.effects';
export * from './user.reducer';
export * from './user.selector';
