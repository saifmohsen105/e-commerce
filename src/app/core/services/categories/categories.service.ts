import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../consts/base-url/baseUrl';
import { ICategories } from '../../../shared/interfaces/ICategories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  http = inject(HttpClient);
  getCategories(): Observable<ICategories> {
    return this.http.get<ICategories>(`${BASE_URL}/api/v1/categories`);
  }
  getSpecificCategore(id: any): Observable<any> {
    return this.http.get(`${BASE_URL}/api/v1/categories/${id}`);
  }
}
