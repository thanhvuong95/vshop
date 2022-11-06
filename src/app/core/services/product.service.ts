import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ICategory } from './../models/category.model';

import {
  IOption,
  IOptionType,
  IOptionValue,
  IProduct,
  IQueryParams,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  queryParams = new BehaviorSubject<IQueryParams>({
    q: null,
    sort: null,
  });

  baseUrl = 'https://6354ba9be64783fa82888cc6.mockapi.io';

  constructor(private _http: HttpClient) {}

  getProducts(page: number = 1, query: IQueryParams) {
    return this._http.get<IProduct[]>(`${this.baseUrl}/product`).pipe(
      map((products) => {
        const limit = 7;
        const { q, sort } = query;

        //fake search
        const searchData = this.searchByName(products, q);
        //fake sort & filter
        const result = this.queryProducts(searchData, sort);
        // fake call api pagination
        const totalPage = Math.ceil(result.length / limit);
        const data = result.slice(0, page * limit);

        return {
          data,
          totalPage,
        };
      })
    );
  }

  getNewArrivalProduct() {
    return this._http
      .get<IProduct[]>(`${this.baseUrl}/product`)
      .pipe(
        map((products) =>
          products.filter((product) => product.category === 'consols')
        )
      );
  }

  getProductById(id: string) {
    return this._http.get<IProduct>(`${this.baseUrl}/product/${id}`);
  }

  getRelativeProduct(id: string, category: ICategory) {
    return this._http.get<IProduct[]>(`${this.baseUrl}/product`).pipe(
      map((products) => {
        return products.filter(
          (product) => product.id !== id && product.category === category
        );
      })
    );
  }

  private queryProducts(products: IProduct[], query: IOption | null) {
    if (!query) return products;

    const { type, value } = query;
    switch (type) {
      case IOptionType.CATEGORY:
        return this.filterByCategory(products, value);
      case IOptionType.NAME:
        return this.sortByName(products, value);
      case IOptionType.PRICE:
        return this.sortByPrice(products, value);
      default:
        return products;
    }
  }

  private searchByName(products: IProduct[], searchValue: string | null) {
    if (searchValue) {
      return products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return products;
  }

  private filterByCategory(products: IProduct[], category: IOptionValue) {
    return products.filter((product) => product.category === category);
  }

  private sortByName(products: IProduct[], type: IOptionValue) {
    type === 'asc'
      ? products.sort((a, b) => a.name.localeCompare(b.name))
      : products.sort((a, b) => b.name.localeCompare(a.name));
    return products;
  }

  private sortByPrice(products: IProduct[], type: IOptionValue) {
    type === 'asc'
      ? products.sort(
          (a, b) =>
            a.price -
            (a.price * a.discountPercent) / 100 -
            (b.price - (b.price * b.discountPercent) / 100)
        )
      : products.sort(
          (a, b) =>
            b.price -
            (b.price * b.discountPercent) / 100 -
            (a.price - (a.price * a.discountPercent) / 100)
        );

    return products;
  }
}
