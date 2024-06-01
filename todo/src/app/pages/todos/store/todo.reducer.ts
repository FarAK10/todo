// src/app/store/todos/todo.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { IGetAllTodosRes, IGetTodoDTO } from '../../../core/typings/todo';
import { ITodoState } from '.';
const initialState: ITodoState = {
  todos: { count: 0, prev: 0, next: 0, results: [] },
  selectedTodo: null,
  error: null,
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({ ...state, todos })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({ ...state, error })),

  on(TodoActions.loadTodoByIdSuccess, (state, { todo }) => ({
    ...state,
    selectedTodo: todo,
  })),
  on(TodoActions.loadTodoByIdFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(TodoActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: { ...state.todos, results: [...state.todos.results, todo] },
  })),
  on(TodoActions.addTodoFailure, (state, { error }) => ({ ...state, error })),
  on(TodoActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: {
      ...state.todos,
      results: state.todos.results.map((t) => (t.id === todo.id ? todo : t)),
    },
  })),
  on(TodoActions.updateTodoFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: {
      ...state.todos,
      results: state.todos.results.filter((t) => t.id !== id),
    },
  })),
  on(TodoActions.deleteTodoFailure, (state, { error }) => ({ ...state, error }))
);
