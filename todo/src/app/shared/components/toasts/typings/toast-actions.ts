import { IToast } from './toast.interface';

export interface IBaseToastAction {
  type: 'add' | 'delete' | 'shift';
}

export interface IAddToastAction extends IBaseToastAction {
  type: 'add';
  toast: IToast;
}

export interface IDeleteToastAction extends IBaseToastAction {
  type: 'delete';
  toast: IToast;
}
