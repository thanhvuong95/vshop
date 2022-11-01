import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

import { FILTER_LIST } from '../../constants/index';
import { ProductService } from './../../../core/services/product.service';

@Component({
  selector: 'app-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShopFilterComponent implements OnInit {
  queryForm!: FormGroup;
  filterList = FILTER_LIST;
  subscription = new Subscription();

  constructor(
    private _productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.queryForm = this.fb.group({
      q: null, // search name value
      sort: null, // dropdown sort value
    });

    this.subscription = this.queryForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((queryParams) =>
        this._productService.queryParams.next(queryParams)
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
