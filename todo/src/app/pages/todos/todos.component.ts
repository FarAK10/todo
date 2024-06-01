import { IGetAllTodosRes } from './../../core/typings/todo';
import { Component, effect, inject, OnInit } from '@angular/core';

import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { Store } from '@ngrx/store';
import * as TodoActions from './store/todo.actions';
import * as TodoSelectors from './store/todo.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastService } from '../../shared/components/toasts/services/toast.service';
import { ToastsComponent } from '../../shared/components/toasts/toasts.component';
import { IToast } from '../../shared/components/toasts/typings/toast.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  standalone: true,
  imports: [CommonModule, TodoComponent],
  providers: [ToastService],
})
export class TodosComponent implements OnInit {
  store = inject(Store);
  private todos$ = this.store.select(TodoSelectors.selectAllTodos);
  private error$ = this.store.select(TodoSelectors.selectTodoError);

  error = toSignal(this.error$);

  todos = toSignal(this.todos$);

  ngOnInit() {
    this.store.dispatch(TodoActions.loadTodos());
  }
}
