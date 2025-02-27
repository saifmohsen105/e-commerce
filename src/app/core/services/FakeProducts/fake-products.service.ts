import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../../../shared/interfaces/IProducts';
import { IFakeProducts } from '../../../shared/interfaces/ifake-products';

@Injectable({
  providedIn: 'root',
})
export class FakeProductsService {
  http = inject(HttpClient);
  getFakeProducts(): Observable<IFakeProducts> {
    return this.http.get<IFakeProducts>('https://fakestoreapi.com/products');
  }
}
