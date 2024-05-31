import { Injectable } from '@angular/core';
import { LocalStorageItems } from '../constants/local-storage.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = LocalStorageItems.accessToken;

  setAccessToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  clearAccessToken() {
    localStorage.removeItem(this.accessTokenKey);
  }
}
