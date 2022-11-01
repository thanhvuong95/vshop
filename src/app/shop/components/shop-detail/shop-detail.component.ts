import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import SwiperCore, { Autoplay, Navigation } from 'swiper';

import { IProduct } from 'src/app/core/models';
import { ProductService } from './../../../core/services/product.service';

SwiperCore.use([Autoplay, Navigation]);

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
})
export class ShopDetailComponent implements OnInit {
  product!: IProduct;
  breadcrumbs: string[] = ['Home', 'Shop'];
  subscription: Subscription = new Subscription();
  error: string | null = null;
  isLoading = false;
  activeImg = 0;
  quantity = '1';

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this._route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => this._productService.getProductById(id!))
      )
      .subscribe({
        next: (product) => {
          this.breadcrumbs.push(product.name);
          this.product = product;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  increaseQty() {
    this.quantity = `${+this.quantity + 1}`;
  }

  decreaseQty() {
    this.quantity = `${+this.quantity - 1}`;
  }

  @ViewChild('qtyRef') quantityRef!: ElementRef;

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
}
