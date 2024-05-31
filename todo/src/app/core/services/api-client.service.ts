import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private httpClient = inject(HttpClient);

  getById<T>(url: string, id: number): Observable<T> {
    const httParams = new HttpParams();
    url = this.generateUrl(url, id);
    return this.httpClient.get<T>(url);
  }

  create<T>(url: string, body: Partial<T>): Observable<T> {
    url = this.generateUrl(url);
    return this.httpClient.post<T>(url, body);
  }

  getAll<T>(url: string): Observable<T[]> {
    url = this.generateUrl(url);
    return this.httpClient.get<T[]>(url);
  }

  deleteByID(id: number, url: string) {
    url = this.generateUrl(url, id);

    return this.httpClient.delete(url);
  }

  updateByID<T>(id: number, url: string, body: Partial<T>): Observable<T> {
    url = this.generateUrl(url, id);

    return this.httpClient.put<T>(url, body);
  }

  generateUrl(...params: (string | number)[]): string {
    return params.join('/');
  }
}
