import { AbstractControl, ValidatorFn } from '@angular/forms';
import { coupons } from 'src/app/utils';

export function MatchCouponValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const couponCode = control.value;
    const filteredCoupon = coupons.filter(
      (coupon) => couponCode === coupon.couponCode
    );
    const isMatch = filteredCoupon.length > 0;
    return isMatch ? null : { match: 'Coupon not found.' };
  };
}
