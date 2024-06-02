import { Routes } from '@angular/router';
import { RootRoutes } from './core/constants/routes';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RootRoutes.todos,
  },
  {
    path: RootRoutes.auth,
    loadComponent: ()=> import('./layouts/auth-layout/auth-layout.component').then(c=>c.AuthLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/login/login.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: RootRoutes.todos,
    canActivate: [authGuard],
    loadComponent: ()=> import('./layouts/main-layout/main-layout.component').then(c=>c.MainLayoutComponent),

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/todos/todos.routes').then((m) => m.routes),
      },
    ],
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
