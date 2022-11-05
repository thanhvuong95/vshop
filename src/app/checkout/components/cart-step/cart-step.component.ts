import { Component, Input, OnInit } from '@angular/core';

import { ICartItem } from './../../../core/models';

@Component({
  selector: 'app-cart-step',
  templateUrl: './cart-step.component.html',
  styleUrls: ['./cart-step.component.scss'],
})
export class CartStepComponent implements OnInit {
  @Input() carts: ICartItem[] = [];

  constructor() {}

  ngOnInit(): void {}
}
