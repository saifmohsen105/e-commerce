import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../consts/base-url/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  http = inject(HttpClient);
  checkOutSesstion(id: string, data: Object): Observable<any> {
    return this.http.post(
      `${BASE_URL}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: data,
      },
      {
        headers: {
          token: localStorage.getItem('userToken')!,
        },
      }
    );
  }
  getUserOrder(id: string): Observable<any> {
    return this.http.get(`${BASE_URL}/api/v1/orders/user/${id}`);
  }
}
