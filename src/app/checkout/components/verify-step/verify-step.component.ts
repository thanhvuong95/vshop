import { Component, Input, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/core/models';

@Component({
  selector: 'app-verify-step',
  templateUrl: './verify-step.component.html',
  styleUrls: ['./verify-step.component.scss'],
})
export class VerifyStepComponent implements OnInit {
  @Input() carts: ICartItem[] = [];

  constructor() {}

  ngOnInit(): void {}
}
