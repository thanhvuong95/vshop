import { ICoupon, ICouponColumn } from '../core/models';

const randomCouponCode = (length: number = 5) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const randomDiscount = (min = 1, max = 20) => {
  return Math.ceil(Math.random() * (max - min) + min);
};

const randomCoupon = (quantity: number = 100) => {
  const result: ICoupon[] = [];
  for (let i = 0; i < quantity; i++) {
    const couponCode = randomCouponCode();
    const discount = randomDiscount();
    result.push({
      couponCode,
      discount,
    });
  }
  return result;
};

export const coupons = randomCoupon();

export const couponColumns: ICouponColumn[] = [
  {
    name: 'Coupon Code',
    sortOrder: null,
    sortFn: (a: ICoupon, b: ICoupon) =>
      a.couponCode.localeCompare(b.couponCode),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Discount',
    sortOrder: null,
    sortFn: (a: ICoupon, b: ICoupon) => a.discount - b.discount,
    sortDirections: ['ascend', 'descend', null],
  },
];
