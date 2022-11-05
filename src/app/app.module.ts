import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { HomeContentComponent } from './home/components/home-content/home-content.component';
import { HomeSliderComponent } from './home/components/home-slider/home-slider.component';

import { ShopComponent } from './shop/shop.component';
import { ShopFilterComponent } from './shop/components/shop-filter/shop-filter.component';
import { ShopContentComponent } from './shop/components/shop-content/shop-content.component';
import { ShopDetailComponent } from './shop/components/shop-detail/shop-detail.component';
import { CartComponent } from './cart/cart.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { CartStepComponent } from './checkout/components/cart-step/cart-step.component';
import { FinishStepComponent } from './checkout/components/finish-step/finish-step.component';
import { VerifyStepComponent } from './checkout/components/verify-step/verify-step.component';

const Components = [
  AppComponent,
  HomeComponent,
  HomeSliderComponent,
  HomeContentComponent,
  ShopComponent,
  ShopContentComponent,
  ShopFilterComponent,
  ShopDetailComponent,
  CartComponent,
  CheckoutComponent,
  CartStepComponent,
  VerifyStepComponent,
  FinishStepComponent,
];

@NgModule({
  declarations: [...Components],
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
