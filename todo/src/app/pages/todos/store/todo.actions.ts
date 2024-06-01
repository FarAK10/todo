import { createAction, props } from '@ngrx/store';
import {
  IGetAllTodosRes,
  IBaseTodoDTO,
  IGetTodoDTO,
} from '../../../core/typings/todo';

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: IGetAllTodosRes }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>()
);

export const loadTodoById = createAction(
  '[Todo] Load Todo By ID',
  props<{ id: string }>()
);
export const loadTodoByIdSuccess = createAction(
  '[Todo] Load Todo By ID Success',
  props<{ todo: IGetTodoDTO }>()
);
export const loadTodoByIdFailure = createAction(
  '[Todo] Load Todo By ID Failure',
  props<{ error: any }>()
);

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: IBaseTodoDTO }>()
);
export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: IGetTodoDTO }>()
);
export const addTodoFailure = createAction(
  '[Todo] Add Todo Failure',
  props<{ error: any }>()
);

export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ id: string; changes: IBaseTodoDTO }>()
);
export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: IGetTodoDTO }>()
);
export const updateTodoFailure = createAction(
  '[Todo] Update Todo Failure',
  props<{ error: any }>()
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: string }>()
);
export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ id: string }>()
);
export const deleteTodoFailure = createAction(
  '[Todo] Delete Todo Failure',
  props<{ error: any }>()
);
