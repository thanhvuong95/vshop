import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IProduct } from 'src/app/core/models';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
})
export class HomeContentComponent implements OnInit {
  products$!: Observable<IProduct[]>;

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this._productService.getNewArrivalProduct();
  }
}
