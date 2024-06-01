import { inject, Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { TodoEndpoints } from '../constants/todo-endpoints';
import { IGetAllTodosRes } from '../typings/todo';
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

  getById() {}

  create() {}

  update() {}

  delete() {}
}
