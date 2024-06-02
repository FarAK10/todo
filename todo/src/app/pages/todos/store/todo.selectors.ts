// src/app/store/todos/todo.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState } from '.';
import { IGetAllTodosRes } from '../../../core/typings/todo';
export const selectTodoState = createFeatureSelector<ITodoState>('todos');

export const selectTodoRes = createSelector(
  selectTodoState,
  (state) => state.todos
);

export const selectAllTodos = createSelector(
  selectTodoRes,
  (state: IGetAllTodosRes) => state.results
);
export const selectSelectedTodo = createSelector(
  selectTodoState,
  (state: ITodoState) => state.selectedTodo
);
export const selectTodoError = createSelector(
  selectTodoState,
  (state: ITodoState) => state.error
);

export const todosCount = createSelector(selectTodoRes, (state) => state.count);
