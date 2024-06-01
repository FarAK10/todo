import { inject, Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { TodoEndpoints } from '../constants/todo-endpoints';
import { IBaseTodoDTO, IGetAllTodosRes, IGetTodoDTO } from '../typings/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoClient {
  private httpClient = inject(HttpClient);
  constructor() {}

  getAll(): Observable<IGetAllTodosRes> {
    return this.httpClient.get<IGetAllTodosRes>(TodoEndpoints.getAll);
  }

  getById(id: string) {
    const url = this.generateUrl(TodoEndpoints.getAll, id);
    return this.httpClient.get<IGetTodoDTO>(url);
  }

  create(body: IBaseTodoDTO) {
    return this.httpClient.post<IGetTodoDTO>(TodoEndpoints.getAll, body);
  }

  update(id: string, body: IBaseTodoDTO) {
    const url = this.generateUrl(TodoEndpoints.getAll, id);
    return this.httpClient.put<IGetTodoDTO>(url, body);
  }

  delete(id: string) {
    return this.httpClient.delete(this.generateUrl(TodoEndpoints.getAll, id));
  }

  generateUrl(...params: (string | number)[]): string {
    return params.join('/');
  }
}
