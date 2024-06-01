// src/app/store/todos/todo.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState } from '.';
export const selectTodoState = createFeatureSelector<ITodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: ITodoState) => state.todos.results
);

export const selectTodoError = createSelector(
  selectTodoState,
  (state: ITodoState) => state.error
);
