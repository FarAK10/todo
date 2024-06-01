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
import { IToast } from '../typings/toast.interface';
import {
  IAddToastAction,
  IBaseToastAction,
  IDeleteToastAction,
} from '../typings/toast-actions';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastAction$ = new Subject<IBaseToastAction>();

  toasts$ = this.toastAction$.pipe(
    scan((toasts: IToast[], action: IBaseToastAction) => {
      console.log(action, toasts);

      switch (action.type) {
        case 'add':
          console.log('add actions');
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
    }, [] as IToast[]),
    tap((toasts) => console.log(toasts))
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
}
