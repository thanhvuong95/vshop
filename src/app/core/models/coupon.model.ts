export interface ICoupon {
  couponCode: string;
  discount: number;
}

export interface ICouponColumn {
  name: string;
  sortOrder: 'ascend' | 'descend' | null;
  sortFn: (a: ICoupon, b: ICoupon) => number;
  sortDirections: ['ascend', 'descend', null];
}
