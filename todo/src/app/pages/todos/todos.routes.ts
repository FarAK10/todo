import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos.component';
import { NgModule } from '@angular/core';
import { todoResolver } from './resolvers/todo-resolver';
import { TodoRoutes } from './constants/todo-routes';

export const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
  {
    path: TodoRoutes.add,
    loadComponent: () =>
      import('./pages/todo-form/todo-form.component').then(
        (m) => m.TodoFormComponent
      ),
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./pages/todo-details/todo-details.component').then(
        (m) => m.TodoDetailsComponent
      ),
    resolve: { todo: todoResolver },
  },
  {
    path: `:id/${TodoRoutes.edit}`,
    resolve: { todo: todoResolver },

    loadComponent: () =>
      import('./pages/todo-form/todo-form.component').then(
        (m) => m.TodoFormComponent
      ),
  },
];
