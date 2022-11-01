import { ICategory } from 'src/app/core/models';

export type IOptionValue = ICategory | 'asc' | 'desc';

export enum IOptionType {
  CATEGORY = 'category',
  NAME = 'name',
  PRICE = 'price',
}

export interface IOption {
  type: IOptionType;
  value: IOptionValue;
}

export interface IQueryParams {
  q: string | null;
  sort: IOption | null;
}
