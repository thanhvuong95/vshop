import { IProduct } from 'src/app/core/models';
export enum ICartAction {
  DECREASE = 'decrease',
  INCREASE = 'increase',
}
export type ICartItem = IProduct & { quantity: number };
