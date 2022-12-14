import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';

import { IProduct } from '../../../core/models';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-shop-content',
  templateUrl: './shop-content.component.html',
  styleUrls: ['./shop-content.component.scss'],
})
export class ShopContentComponent implements OnInit {
  isLoadMore = false;
  isLoading = false;

  error: string | null = null;

  page = 1;
  totalPage = 0;
  products: IProduct[] = [];

  subscription: Subscription[] = [];
  skeleton = new Array(6); // number of skeleton

  constructor(
    private _productService: ProductService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    const subs = this._productService.queryParams
      .asObservable()
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.page = 1; // reset page
        }),
        switchMap((queryParams) =>
          this._productService.getProducts(this.page, queryParams)
        )
      )
      .subscribe({
        next: (result) => {
          const { totalPage, data } = result;
          this.isLoading = false;
          this.totalPage = totalPage;
          this.products = data;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.error = err.message;
        },
      });
    this.subscription.push(subs);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  loadMoreProduct() {
    if (this.page < this.totalPage) {
      const queryParams = this._productService.queryParams.getValue();
      this.isLoadMore = true;
      const subs = this._productService
        .getProducts(++this.page, queryParams)
        .subscribe({
          next: (res) => {
            const { data } = res;
            this.isLoadMore = false;
            this.products = data;
          },
          error: (err: HttpErrorResponse) => {
            this.isLoadMore = false;
            this.error = err.message;
          },
        });
      this.subscription.push(subs);
    }
  }
}
