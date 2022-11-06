import { ICartItem } from './cart.model';

export interface IOrder {
  orderId: string;
  createdAt: number;
  fullName: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  city: string;
  products: ICartItem[];
  total: number;
}
