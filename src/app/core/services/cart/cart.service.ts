import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../consts/base-url/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClient);
  idPlatForm = inject(PLATFORM_ID);
  addProductToCart(id: string): Observable<any> {
    return this.http.post(
      `${BASE_URL}/api/v1/cart`,
      { productId: id },
      {
        headers: { token: localStorage.getItem('userToken')! },
      }
    );
  }
  getLoggedUserCart(): Observable<any> {
    return this.http.get(`${BASE_URL}/api/v1/cart`, {
      headers: {
        token: isPlatformBrowser(this.idPlatForm)
          ? localStorage.getItem('userToken')!
          : '',
      },
    });
  }
  deleteSpecificCart(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/api/v1/cart/${id}`, {
      headers: {
        token: localStorage.getItem('userToken')!,
      },
    });
  }
  updateCountProduct(id: string, newCount: number): Observable<any> {
    return this.http.put(
      `${BASE_URL}/api/v1/cart/${id}`,
      {
        count: newCount,
      },
      {
        headers: {
          token: localStorage.getItem('userToken')!,
        },
      }
    );
  }
}
