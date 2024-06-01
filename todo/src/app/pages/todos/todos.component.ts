import { IGetAllTodosRes } from './../../core/typings/todo';
import { Component, inject, OnInit } from '@angular/core';
import { TodoClient } from '../../core/services/todo-client.service';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { Store } from '@ngrx/store';
import * as TodoActions from './store/todo.actions';
import * as TodoSelectors from './store/todo.selectors';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  standalone: true,
  imports: [CommonModule, TodoComponent],
  providers: [TodoClient],
})
export class TodosComponent implements OnInit {
  store = inject(Store);

  constructor() {}
  todos$ = this.store.select(TodoSelectors.selectAllTodos);

  ngOnInit() {
    this.store.dispatch(TodoActions.loadTodos());
  }
}
