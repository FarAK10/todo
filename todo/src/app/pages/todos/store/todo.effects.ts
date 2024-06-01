// src/app/store/todos/todo.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TodoClient } from '../../../core/services/todo-client.service';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoClient: TodoClient) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoClient.getAll().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => of(TodoActions.loadTodosFailure({ error })))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      mergeMap((action) =>
        this.todoClient.create(action.todo).pipe(
          map((todo) => TodoActions.addTodoSuccess({ todo })),
          catchError((error) => of(TodoActions.addTodoFailure({ error })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap((action) =>
        this.todoClient.update(action.id, action.changes).pipe(
          map((todo) => TodoActions.updateTodoSuccess({ todo })),
          catchError((error) => of(TodoActions.updateTodoFailure({ error })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap((action) =>
        this.todoClient.delete(action.id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id: action.id })),
          catchError((error) => of(TodoActions.deleteTodoFailure({ error })))
        )
      )
    )
  );

  loadTodoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodoById),
      mergeMap((action) =>
        this.todoClient.getById(action.id).pipe(
          map((todo) => TodoActions.loadTodoByIdSuccess({ todo })),
          catchError((error) => of(TodoActions.loadTodoByIdFailure({ error })))
        )
      )
    )
  );
}
