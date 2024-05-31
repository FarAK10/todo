import { Routes } from '@angular/router';
import { RootRoutes } from './core/constants/routes';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: RootRoutes.auth,
    loadComponent() {
      return import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      );
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: RootRoutes.todos,
    loadComponent: () =>
      import('./pages/todos/todos.component').then((m) => m.TodosComponent),
  },
];
