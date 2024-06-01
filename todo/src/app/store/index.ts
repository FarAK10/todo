import { ITodoState, TodoEffects } from '../pages/todos/store';
import { todoReducer } from '../pages/todos/store/todo.reducer';
import { UserEffects, userReducer } from './user';
export * from '../pages/todos/store';
export * from './user';
export interface IStore {
  todos: ITodoState;
}
export const reducers = {
  todos: todoReducer,
  user: userReducer,
};

export const effects = [TodoEffects, UserEffects];
