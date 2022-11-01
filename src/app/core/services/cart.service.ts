import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ICartAction, ICartItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  carts = new BehaviorSubject<ICartItem[]>([]);

  constructor() {}

  add(product: ICartItem) {
    const carts = this.carts.getValue();
    const idx = carts.findIndex((cart) => cart.id === product.id);
    if (idx !== -1) {
      carts[idx].quantity += product.quantity;
    } else {
      carts.push(product);
    }
    this.carts.next(carts);
  }

  remove(id: string) {
    const carts = this.carts.getValue();
    const filteredCarts = carts.filter((cart) => cart.id !== id);
    this.carts.next(filteredCarts);
  }

  changeQty(id: string, type: ICartAction) {
    const carts = this.carts.getValue();
    carts.map((cart) => {
      if (cart.id === id) {
        type === 'increase' ? cart.quantity++ : cart.quantity--;
      }
      return cart;
    });
    this.carts.next(carts);
  }
}
