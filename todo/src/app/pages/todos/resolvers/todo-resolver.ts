import { ResolveFn } from '@angular/router';
import { selectTodoError } from './../store/todo.selectors';
import { IGetTodoDTO } from '../../../core/typings/todo';
import { catchError, filter, of, switchMap, take } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TodoSelectors from '../store/todo.selectors';
import * as TodoActions from '../store/todo.actions';
export const todoResolver: ResolveFn<IGetTodoDTO | null> = (route, state) => {
  const todoId = route.paramMap.get('id');
  const store = inject(Store);
  if (!todoId) {
    return of(null);
  }

  return store.select(TodoSelectors.selectSelectedTodo).pipe(
    take(1),
    switchMap((selectedTodo) => {
      if (selectedTodo && selectedTodo.id === todoId) {
        return of(selectedTodo);
      }
      store.dispatch(TodoActions.loadTodoById({ id: todoId }));
      return store.select(TodoSelectors.selectSelectedTodo).pipe(
        filter((todo) => !!todo && todo.id === todoId),
        take(1)
      );
    }),
    catchError(() => of(null))
  );
};
