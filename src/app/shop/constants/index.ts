import { ICategory } from 'src/app/core/models';

export const FILTER_LIST = [
  {
    label: 'Category',
    value: 'category',
    options: [
      {
        icon: 'sitemap',
        label: ICategory.ACCESSORIES,
        value: ICategory.ACCESSORIES,
      },
      {
        icon: 'mobile',
        label: ICategory.PHONE,
        value: ICategory.PHONE,
      },
      {
        icon: 'joystick',
        label: ICategory.CONSOLS,
        value: ICategory.CONSOLS,
      },
      {
        icon: 'headphone',
        label: ICategory.HEADPHONE,
        value: ICategory.HEADPHONE,
      },
    ],
  },
  {
    label: 'Price',
    value: 'price',
    options: [
      {
        icon: 'sort-up',
        label: 'Low to High',
        value: 'asc',
      },
      {
        icon: 'sort-down',
        label: 'High to Low',
        value: 'desc',
      },
    ],
  },
  {
    label: 'Product Name',
    value: 'name',
    options: [
      {
        icon: 'sort-a-z',
        label: 'A-Z',
        value: 'asc',
      },
      {
        icon: 'sort-z-a',
        label: 'Z-A',
        value: 'desc',
      },
    ],
  },
];

// [
//     {
//       label: 'Category',
//       options: [
//         ICategory.ACCESSORIES,
//         ICategory.PHONE,
//         ICategory.HEADPHONE,
//         ICategory.CONSOLS,
//       ],
//     },
//     {
//       label: 'Price',
//       options: ['Low to high', 'High to low'],
//     },
//     {
//       label: 'Product name',
//       options: ['A-Z', 'Z-A'],
//     },
//   ]
