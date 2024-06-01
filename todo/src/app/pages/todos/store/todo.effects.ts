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
import { Location } from '@angular/common';

@Injectable()
export class TodoEffects {
  actions$ = inject(Actions);
  todoClient = inject(TodoClient);
  toastService = inject(ToastService);
  router = inject(Router);
  location = inject(Location);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoClient.getAll().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => {
            this.toastService.addErrorMessageToast(error, 'load_todos');

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
          map((todo) => {
            const toaster: IToast = {
              key: 'todo_create_success',
              message: 'Todo successfully created',
              type: 'success',
            };
            this.toastService.addToast(toaster);
            this.location.back();
            return TodoActions.addTodoSuccess({ todo });
          }),
          catchError((error) => {
            this.toastService.addErrorMessageToast(error, 'add_todo');

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
          map((todo) => {
            const toaster: IToast = {
              key: 'todo_update_success',
              message: 'Todo updated successfully!',
              type: 'success',
            };
            const route = `${RootRoutes.todos}/${todo.id}`;
            this.router.navigate([route]);
            this.toastService.addToast(toaster);
            return TodoActions.updateTodoSuccess({ todo });
          }),
          catchError((error) => {
            this.toastService.addErrorMessageToast(error, 'update_todo_error');

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
            const toast: IToast = {
              key: 'deleted_success',
              message: 'Todo deleted successfully!',
              type: 'success',
            };

            this.toastService.addToast(toast);
            this.router.navigate([RootRoutes.todos]);
            return TodoActions.deleteTodoSuccess({ id: action.id });
          }),
          catchError((error) => {
            this.toastService.addErrorMessageToast(error, 'update_todo');

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
            this.toastService.addErrorMessageToast(error, 'load_todo');

            return of(TodoActions.loadTodoByIdFailure({ error }));
          })
        )
      )
    )
  );
}
