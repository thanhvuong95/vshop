import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../core/services/cart.service';
import { ICartItem } from '../core/models';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent implements OnInit {
  steps = ['Cart', 'Check out', 'Finish'];
  step = 1;
  carts: ICartItem[] = [];
  subscription = new Subscription();
  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this.subscription = this._cartService.carts.subscribe(
      (carts) => (this.carts = carts)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
