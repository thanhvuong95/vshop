import { CartService } from './../../../core/services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/core/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProduct;

  get discountPercent() {
    return this.product.discountPercent * -1 + '%';
  }

  get priceDiscount() {
    return (
      this.product.price -
      (this.product.price * this.product.discountPercent) / 100
    );
  }

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(e: Event) {
    e.stopPropagation();
    this._cartService.add({ ...this.product, quantity: 1 });
  }
}
