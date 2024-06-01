import { IGetAllTodosRes, IGetTodoDTO } from '../../../core/typings/todo';
export * from './todo.actions';
export * from './todo.reducer';
export * from './todo.selectors';
export * from './todo.effects';

export interface ITodoState {
  todos: IGetAllTodosRes;
  selectedTodo: IGetTodoDTO | null;
  error: any;
}

export const initialState: ITodoState = {
  todos: { count: 0, prev: 0, next: 0, results: [] },
  selectedTodo: null,
  error: null,
};
