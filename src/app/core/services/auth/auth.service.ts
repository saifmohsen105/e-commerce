import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../consts/base-url/baseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  sentRegister(data: object): Observable<any> {
    return this.http.post(`${BASE_URL}/api/v1/auth/signup`, data);
  }
  sentLogin(data: object): Observable<any> {
    return this.http.post(`${BASE_URL}/api/v1/auth/signin`, data);
  }
}
