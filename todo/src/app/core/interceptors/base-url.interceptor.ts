import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    url: environment.baseUrl + req.url,
  });
  return next(req);
};
