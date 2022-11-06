import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { ICartItem, ICoupon, IOrder } from '../../../core/models';
import { calculateTotalPrice } from '../../../utils';
import { CartService } from './../../../core/services/cart.service';
import { OrderService } from './../../../core/services/order.service';

@Component({
  selector: 'app-verify-step',
  templateUrl: './verify-step.component.html',
  styleUrls: ['./verify-step.component.scss'],
})
export class VerifyStepComponent implements OnInit {
  @Input() carts: ICartItem[] = [];
  @Input() selectedCoupon: ICoupon | null = null;
  @Output() next = new EventEmitter<number>();
  @Output() onOrder = new EventEmitter<string>();

  infoForm!: FormGroup;
  isSubmitting = false;

  get totalPrice() {
    const price = calculateTotalPrice(this.carts);
    if (this.selectedCoupon) {
      return price - (price * this.selectedCoupon.discount) / 100;
    }
    return price;
  }

  constructor(
    private _fb: FormBuilder,
    private _orderService: OrderService,
    private _cartService: CartService,
    private _notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.infoForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: [
        '',
        Validators.compose([Validators.required, Validators.pattern('[0-9]*')]),
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{10}'),
        ]),
      ],
    });
  }
  submitForm() {
    if (this.infoForm.valid) {
      const { firstName, lastName, address, zipCode, city, phoneNumber } =
        this.infoForm.value;
      const formData: IOrder = {
        orderId: Date.now().toString(),
        fullName: firstName + ' ' + lastName,
        createdAt: Date.now(),
        address,
        city,
        zipCode,
        phoneNumber,
        products: this.carts,
        total: this.totalPrice,
      };
      this.isSubmitting = true;
      this._orderService.order(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.isSubmitting = false;
          this.next.emit();
          this.onOrder.emit(data.orderId);
          this._cartService.carts.next([]);
        },
        error: (err) => {
          this._notification.error('Error', err.message, {
            nzPlacement: 'topRight',
            nzDuration: 2000,
          });
        },
      });
    }
  }
}
