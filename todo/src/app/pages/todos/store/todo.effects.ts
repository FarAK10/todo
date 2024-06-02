// src/app/store/todos/todo.effects.ts

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
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
          catchError((error) => of(TodoActions.loadTodosFailure({ error })))
        )
      )
    )
  );



  loadTodosErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodosFailure),
      tap((action) => {
        this.toastService.addErrorMessageToast(action.error, 'load_todos');
      })
    ),
    { dispatch: false }
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

  addTodoSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodoSuccess),
      tap(() => {
        const toast: IToast = {
          key: 'todo_create_success',
          message: 'Todo successfully created',
          type: 'success',
        };
        this.toastService.addToast(toast);
        this.location.back();
      })
    ),
    { dispatch: false }
  );

  addTodoErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodoFailure),
      tap((action) => {
        this.toastService.addErrorMessageToast(action.error, 'add_todo');
      })
    ),
    { dispatch: false }
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

  updateTodoSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodoSuccess),
      tap((action) => {
        const toast: IToast = {
          key: 'todo_update_success',
          message: 'Todo updated successfully!',
          type: 'success',
        };
        const route = `${RootRoutes.todos}/${action.todo.id}`;
        this.router.navigate([route]);
        this.toastService.addToast(toast);
      })
    ),
    { dispatch: false }
  );

  updateTodoErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodoFailure),
      tap((action) => {
        this.toastService.addErrorMessageToast(action.error, 'update_todo_error');
      })
    ),
    { dispatch: false }
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

  deleteTodoSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodoSuccess),
      tap(() => {
        const toast: IToast = {
          key: 'deleted_success',
          message: 'Todo deleted successfully!',
          type: 'success',
        };
        this.toastService.addToast(toast);
        this.router.navigate([RootRoutes.todos]);
      })
    ),
    { dispatch: false }
  );

  deleteTodoErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodoFailure),
      tap((action) => {
        this.toastService.addErrorMessageToast(action.error, 'delete_todo');
      })
    ),
    { dispatch: false }
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



  loadTodoByIdErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodoByIdFailure),
      tap((action) => {
        this.toastService.addErrorMessageToast(action.error, 'load_todo');
      })
    ),
    { dispatch: false }
  );
}
