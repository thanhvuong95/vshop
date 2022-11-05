import { ICartItem } from '../core/models';

export const calculateTotalPrice = (carts: ICartItem[]) => {
  return carts.reduce((out, item) => {
    const { price, discountPercent, quantity } = item;
    const priceDiscount = price - (price * discountPercent) / 100;
    return out + priceDiscount * quantity;
  }, 0);
};
