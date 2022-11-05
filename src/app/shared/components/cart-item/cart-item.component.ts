import { Component, Input, OnInit } from '@angular/core';

import { ICartAction, ICartItem } from './../../../core/models';
import { CartService } from './../../../core/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: ICartItem;

  get priceDiscount() {
    return (
      this.cartItem.price -
      (this.cartItem.price * this.cartItem.discountPercent) / 100
    );
  }

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {}

  deleteCartItem(e: Event, id: string) {
    e.stopPropagation();
    this._cartService.remove(id);
  }

  increaseQty(e: Event, id: string) {
    e.stopPropagation();
    this._cartService.changeQty(id, ICartAction.INCREASE);
  }

  decreaseQty(e: Event, id: string) {
    e.stopPropagation();
    this._cartService.changeQty(id, ICartAction.DECREASE);
  }
}
