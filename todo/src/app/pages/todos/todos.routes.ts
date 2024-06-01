import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos.component';
import { NgModule } from '@angular/core';
import { todoResolver } from './resolvers/todo-resolver';

export const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/todo-details/todo-details.component').then(
        (m) => m.TodoDetailsComponent
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
];
