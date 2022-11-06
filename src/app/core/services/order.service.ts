import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'https://6354ba9be64783fa82888cc6.mockapi.io';

  constructor(private http: HttpClient) {}

  order(data: IOrder) {
    return this.http.post<IOrder>(`${this.baseUrl}/cart`, data);
  }
}
