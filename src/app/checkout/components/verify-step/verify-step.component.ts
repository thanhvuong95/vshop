import { Component, Input, OnInit } from '@angular/core';

import { ICartItem } from '../../../core/models';
import { calculateTotalPrice } from '../../../utils';

@Component({
  selector: 'app-verify-step',
  templateUrl: './verify-step.component.html',
  styleUrls: ['./verify-step.component.scss'],
})
export class VerifyStepComponent implements OnInit {
  @Input() carts: ICartItem[] = [];

  get totalPrice() {
    return calculateTotalPrice(this.carts);
  }
  constructor() {}

  ngOnInit(): void {}
}
