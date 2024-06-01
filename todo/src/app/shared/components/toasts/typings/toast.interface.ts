export interface IToast {
  key: string;
  message: string;
  type: toastType;
}

type toastType = 'success' | 'error' | 'info' | 'warning';
