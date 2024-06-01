import { IGetAllTodosRes } from './../../core/typings/todo';
import { Component, inject, OnInit } from '@angular/core';
import { TodoClient } from '../../core/services/todo-client.service';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  standalone: true,
  imports: [CommonModule, TodoComponent],
  providers: [TodoClient],
})
export class TodosComponent implements OnInit {
  todosClient = inject(TodoClient);
  constructor() {}
  todos$ = this.todosClient.getAll().pipe(map((v) => v.results));
  ngOnInit() {
    this.todosClient.getAll().subscribe((v) => console.log(v));
  }
}
