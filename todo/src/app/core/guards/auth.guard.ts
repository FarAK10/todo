import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RootRoutes } from '../constants/routes';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService
    .isAuthenticated()
    .pipe(map((isAuth) => isAuth || router.createUrlTree([RootRoutes.auth])));
};
