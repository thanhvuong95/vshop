import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import SwiperCore, { Autoplay, Navigation } from 'swiper';

import { IProduct } from 'src/app/core/models';
import { CartService } from './../../../core/services/cart.service';
import { ProductService } from './../../../core/services/product.service';

SwiperCore.use([Autoplay, Navigation]);

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
})
export class ShopDetailComponent implements OnInit {
  @ViewChild('qtyRef') quantityRef!: ElementRef;
  breadcrumbs: string[] = ['Home', 'Shop'];
  error: string | null = null;
  isLoading = false;
  activeImg = 0;
  quantity = '1';
  product!: IProduct;
  relativeProducts!: Observable<IProduct[]>;
  subscription: Subscription[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const subs = this._route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => this._productService.getProductById(id!)),
        tap(
          ({ id, category }) =>
            (this.relativeProducts = this._productService.getRelativeProduct(
              id,
              category
            ))
        )
      )
      .subscribe({
        next: (product) => {
          this.isLoading = false;
          this.breadcrumbs.push(product.name);
          this.product = product;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error;
        },
      });

    this.subscription.push(subs);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }

  increaseQty() {
    this.quantity = `${+this.quantity + 1}`;
  }

  decreaseQty() {
    this.quantity = `${+this.quantity - 1}`;
  }

  onChange(value: string) {
    const reg = /^[1-9][0-9]*$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '') {
      this.quantity = value;
    }
    this.quantityRef!.nativeElement.value = this.quantity;
  }

  onBlur() {
    this.quantity = this.quantity || '1';
  }

  addToCart() {
    this._cartService.add({ ...this.product, quantity: +this.quantity });
  }
}
