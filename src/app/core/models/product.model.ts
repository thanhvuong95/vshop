import { ICategory } from './category.model';

export interface IProduct {
  id: string;
  name: string;
  category: ICategory;
  price: number;
  inStock: boolean;
  features: string[];
  imageUrls: string[];
  timeStamp: {
    seconds: number;
    nanoseconds: number;
  };
  description: string;
  discountPercent: number;
}
