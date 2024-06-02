import { inject, Injectable } from '@angular/core';
import { LocalStorageItems } from '../constants/local-storage.enum';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../../store/user/user.selector';
import { map, Observable, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  store = inject(Store);
  private accessTokenKey = LocalStorageItems.accessToken;
  private userIdKey = LocalStorageItems.userId;

  setAccessToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  clearAccessToken() {
    localStorage.removeItem(this.accessTokenKey);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store
      .select(UserSelectors.selectUserId)
      .pipe(map((userId) => !!userId && !!this.getAccessToken()));
  }
}
