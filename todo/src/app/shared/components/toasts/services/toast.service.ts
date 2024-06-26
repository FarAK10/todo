import { IToast } from './../typings/toast.interface';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  delay,
  filter,
  interval,
  map,
  Observable,
  scan,
  startWith,
  Subject,
  switchMap,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';
import {
  IAddToastAction,
  IBaseToastAction,
  IDeleteToastAction,
} from '../typings/toast-actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastAction$ = new Subject<IBaseToastAction>();

  toasts$ = this.toastAction$.pipe(
    scan((toasts: IToast[], action: IBaseToastAction) => {
      switch (action.type) {
        case 'add':
          const toast = (action as IAddToastAction).toast;
          toasts.push(toast);
          break;
        case 'shift':
          toasts.shift();
          break;
        case 'delete':
          toasts = toasts.filter(
            (t) => t.key !== (action as IDeleteToastAction).toast.key
          );
      }
      return toasts;
    }, [] as IToast[])
  );

  clearToasts$ = this.toastAction$.pipe(
    filter((action) => action.type === 'add'),
    delay(3000),
    tap(() => {
      const action: IBaseToastAction = { type: 'shift' };
      this.toastAction$.next(action);
    })
  );

  addToast(toast: IToast) {
    const action: IAddToastAction = { type: 'add', toast };
    this.toastAction$.next(action);
  }

  deleteToast(toast: IToast) {
    const action: IDeleteToastAction = { type: 'delete', toast };
    this.toastAction$.next(action);
  }

  addErrorMessageToast(error: HttpErrorResponse, key: string) {
    const toast: IToast = {
      key,
      message: error?.error?.message || error.message,
      type: 'error',
    };

    if (error.status === 500) {
      toast.message = 'Server unavailable, try again!';
    }

    this.addToast(toast);
  }
}
