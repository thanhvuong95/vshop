import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish-step',
  templateUrl: './finish-step.component.html',
  styleUrls: ['./finish-step.component.scss'],
})
export class FinishStepComponent implements OnInit {
  @Input() orderId = '';

  get orderTitle() {
    return `Your Order Id: ${this.orderId}. \n You can see your order in profile section.`;
  }

  constructor() {}

  ngOnInit(): void {}
}
