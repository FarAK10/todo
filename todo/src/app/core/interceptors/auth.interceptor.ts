import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment.prod';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(AuthService);
  const token = storage.clearAccessToken();

  req = req.clone({
    url: environment.baseUrl + req.url,
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(req);
};
