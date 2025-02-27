import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../consts/base-url/baseUrl';
import { IProducts } from '../../../shared/interfaces/IProducts';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);
  getProduct(): Observable<any> {
    return this.http.get(`${BASE_URL}/api/v1/products`);
  }
  getSpecificProduct(id: any): Observable<any> {
    return this.http.get(`${BASE_URL}/api/v1/products/${id}`);
  }
}
