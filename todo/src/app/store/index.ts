import { ITodoState } from '../pages/todos/store';
import { todoReducer } from '../pages/todos/store/todo.reducer';
export * from '../pages/todos/store';
export interface IStore {
  todos: ITodoState;
}
export const reducers = {
  todos: todoReducer,
};
