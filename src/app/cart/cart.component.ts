import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ICartItem, ICartAction } from './../core/models';
import { CartService } from './../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() openCart: boolean = false;
  @Output() closeCart = new EventEmitter();
  carts: ICartItem[] = [];
  totalPrice = 0;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.carts.subscribe((carts) => {
      this.totalPrice = carts.reduce((total, cart) => {
        const { price, discountPercent, quantity } = cart;
        const priceDiscount = price - (price * discountPercent) / 100;
        total += priceDiscount * quantity;
        return total;
      }, 0);
      this.carts = carts;
    });
  }

  deleteCartItem(id: string) {
    this._cartService.remove(id);
  }

  increaseQty(id: string) {
    this._cartService.changeQty(id, ICartAction.INCREASE);
  }

  decreaseQty(id: string) {
    this._cartService.changeQty(id, ICartAction.DECREASE);
  }
}
