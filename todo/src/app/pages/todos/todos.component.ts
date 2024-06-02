import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { Store } from '@ngrx/store';
import * as TodoActions from './store/todo.actions';
import * as TodoSelectors from './store/todo.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastService } from '../../shared/components/toasts/services/toast.service';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TodoRoutes } from './constants/todo-routes';
import { map } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  standalone: true,
  imports: [CommonModule, TodoComponent, MatButtonModule, RouterModule],
  providers: [ToastService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  store = inject(Store);
  routes = TodoRoutes;
  private todos$ = this.store.select(TodoSelectors.selectAllTodos);
  private todosCount$ = this.store.select(TodoSelectors.todosCount);
  todos = toSignal(this.todos$);
  count = toSignal(this.todosCount$);

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.store.dispatch(TodoActions.loadTodos());
  }
}
