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
  @Input() selectedCoupon: ICoupon | null = null;
  @Output() next = new EventEmitter();
  @Output() changeCoupon = new EventEmitter<ICoupon | null>();

  couponInputCode!: FormControl;
  isOpenModal = false;
  couponData: ICoupon[] = [];
  couponColumns: ICouponColumn[] = [];
  disabled = true;
  subscription = new Subscription();
  decreasedPrice = 0;

  get totalPrice() {
    const { discount } = this.selectedCoupon || {};
    const price = calculateTotalPrice(this.carts);

    if (discount) {
      const priceDiscount = price - (price * discount) / 100;
      this.decreasedPrice = price - priceDiscount;
      return priceDiscount;
    }
    return price;
  }

  constructor(private _notification: NzNotificationService) {}

  ngOnInit(): void {
    this.couponData = coupons;
    this.couponColumns = couponColumns;
    this.initForm();
    this.subscription = this.couponInputCode.valueChanges.subscribe((value) => {
      this.disabled = !value;
    });
  }

  ngAfterViewInit(): void {
    if (this.selectedCoupon) {
      this.couponInputCode.setValue(this.selectedCoupon.couponCode);
      this.couponInputCode.disable();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      this.changeCoupon.emit(coupon);
      this.couponInputCode.disable();
    } else {
      this.changeCoupon.emit(null);
      this.couponInputCode.enable();
      if (errors) {
        this._notification.error('Error', errors['match'], {
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
}
