import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(AuthService);
  const token = storage.clearAccessToken();

  if (!req.url.includes('assets')) {
    debugger;
    req = req.clone({
      url: environment.baseUrl + req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
