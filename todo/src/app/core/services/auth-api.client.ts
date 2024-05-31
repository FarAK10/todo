import { inject, Injectable } from '@angular/core';
import { LocalStorageItems } from '../constants/local-storage.enum';
import { HttpClient } from '@angular/common/http';
import { ILoginDTO } from '../typings/login.dto';
import { AuthEndpoints } from '../constants/auth-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthApiClient {
  httpClient = inject(HttpClient);

  login(loginDTO: ILoginDTO) {
    return this.httpClient.post(AuthEndpoints.login, loginDTO);
  }
}
