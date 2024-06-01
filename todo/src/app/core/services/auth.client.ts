import { inject, Injectable } from '@angular/core';
import { LocalStorageItems } from '../constants/local-storage.enum';
import { HttpClient } from '@angular/common/http';
import { ILoginDTO, ILoginResponse } from '../typings/auth.dto';
import { AuthEndpoints } from '../constants/auth-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthApiClient {
  httpClient = inject(HttpClient);

  login(loginDTO: ILoginDTO) {
    return this.httpClient.post<ILoginResponse>(AuthEndpoints.login, loginDTO);
  }
}
