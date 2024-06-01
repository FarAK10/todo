import { Routes } from '@angular/router';
import { RootRoutes } from './core/constants/routes';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: RootRoutes.auth,
  },
  {
    path: RootRoutes.auth,
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./pages/login/login.routes').then((m) => m.routes),
  },
  {
    path: RootRoutes.todos,
    canActivate: [authGuard],
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/todos/todos.routes').then((m) => m.routes),
  },

  {
    path: RootRoutes.notFound,
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },

  {
    path: '**',
    redirectTo: RootRoutes.notFound,
  },
];
