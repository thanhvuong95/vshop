import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { MatchCouponValidator } from 'src/app/core/validators/match-coupon.validator';

import { ICartItem, ICoupon, ICouponColumn } from './../../../core/models';
import { calculateTotalPrice, couponColumns, coupons } from './../../../utils';

@Component({
  selector: 'app-cart-step',
  templateUrl: './cart-step.component.html',
  styleUrls: ['./cart-step.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartStepComponent implements OnInit {
  @Input() carts: ICartItem[] = [];
  @Output() next = new EventEmitter<number>();
  couponInputCode!: FormControl;
  isOpenModal = false;
  couponData: ICoupon[] = [];
  couponColumns: ICouponColumn[] = [];
  disabled = true;
  subscription = new Subscription();
  selectedCoupon: ICoupon | null = null;
  initTotalPrice = 0;

  get totalPrice() {
    const price = calculateTotalPrice(this.carts);
    this.initTotalPrice = price;
    if (this.selectedCoupon) {
      return price - (price * this.selectedCoupon.discount) / 100;
    }
    return price;
  }

  constructor(private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.couponData = coupons;
    this.couponColumns = couponColumns;
    this.initForm();
    this.subscription = this.couponInputCode.valueChanges.subscribe((value) => {
      this.disabled = !value;
    });
  }

  initForm() {
    this.couponInputCode = new FormControl('', MatchCouponValidator());
  }

  submit() {
    const { valid, errors } = this.couponInputCode;
    if (valid) {
      const [coupon] = coupons.filter(
        (coupon) => coupon.couponCode === this.couponInputCode.value
      );
      this.selectedCoupon = coupon;
      this.couponInputCode.disable();
    } else {
      this.selectedCoupon = null;
      this.couponInputCode.enable();
      if (errors) {
        this.notification.error('Error', errors['match'], {
          nzPlacement: 'topRight',
          nzDuration: 2000,
        });
      } else {
        this.couponInputCode.setValue('');
      }
    }
  }

  toggleModal() {
    this.isOpenModal = !this.isOpenModal;
  }

  selectCoupon(data: ICoupon) {
    this.toggleModal();
    this.couponInputCode.setValue(data.couponCode);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
