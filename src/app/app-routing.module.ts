import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopDetailComponent } from './shop/components/shop-detail/shop-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'shop',
    children: [
      {
        path: '',
        component: ShopComponent,
      },
      {
        path: ':id',
        component: ShopDetailComponent,
      },
    ],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
