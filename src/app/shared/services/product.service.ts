import { Injectable } from '@angular/core';
import {Pageable, TableDataSource} from "../common/table.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = environment.BASE_URL;
  endPoint = "/product";

  get url(): string {
    return `${this.baseURL}${this.endPoint}`;
  }

  constructor(
    private http: HttpClient
  ) { }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }

  find(paging: Pageable): Observable<TableDataSource<Product>> {
    const params = { page: paging.pageNumber, size: paging.pageSize }

    return this.http.get<TableDataSource<Product>>(this.url, { params }).pipe(
      map(value => {
        value.content = value.content.map(Product.fromApi);

        return value;
      })
    );
  }

  destroy(product: Product): Observable<void> {
    return this.http.delete<void>(`${this.url}/${product.id}`)
  }
}
