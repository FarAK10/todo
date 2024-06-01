// src/app/store/todos/todo.effects.ts

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TodoClient } from '../../../core/services/todo-client.service';
import { ToastService } from '../../../shared/components/toasts/services/toast.service';
import { IToast } from '../../../shared/components/toasts/typings/toast.interface';
import { Router } from '@angular/router';
import { RootRoutes } from '../../../core/constants/routes';

@Injectable()
export class TodoEffects {
  actions$ = inject(Actions);
  todoClient = inject(TodoClient);
  toastService = inject(ToastService);
  router = inject(Router);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoClient.getAll().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => {
            const toast: IToast = {
              key: 'load_todos',
              message: error?.error?.message || error.message,
              type: 'error',
            };
            this.toastService.addToast(toast);
            return of(TodoActions.loadTodosFailure({ error }));
          })
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
          catchError((error) => {
            const toast: IToast = {
              key: 'add_todo',
              message: error?.error?.message || error.message,
              type: 'error',
            };
            this.toastService.addToast(toast);
            return of(TodoActions.addTodoFailure({ error }));
          })
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
          catchError((error) => {
            const toast: IToast = {
              key: 'update_todo',
              message: error?.error?.message || error.message,
              type: 'error',
            };
            this.toastService.addToast(toast);

            return of(TodoActions.updateTodoFailure({ error }));
          })
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap((action) =>
        this.todoClient.delete(action.id).pipe(
          map(() => {
            this.router.navigate([RootRoutes.todos]);
            return TodoActions.deleteTodoSuccess({ id: action.id });
          }),
          catchError((error) => {
            const toast: IToast = {
              key: 'update_todo',
              message: error?.error?.message || error.message,
              type: 'error',
            };
            this.toastService.addToast(toast);

            return of(TodoActions.deleteTodoFailure({ error }));
          })
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
          catchError((error) => {
            const toast: IToast = {
              key: 'update_todo',
              message: error?.error?.message || error.message,
              type: 'error',
            };
            this.toastService.addToast(toast);
            return of(TodoActions.loadTodoByIdFailure({ error }));
          })
        )
      )
    )
  );
}
