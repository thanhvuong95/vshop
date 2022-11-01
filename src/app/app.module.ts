import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { ShopDetailComponent } from './shop/components/shop-detail/shop-detail.component';
import { ShopFilterComponent } from './shop/components/shop-filter/shop-filter.component';
import { ShopContentComponent } from './shop/components/shop-content/shop-content.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { HomeSliderComponent } from './home/components/home-slider/home-slider.component';
import { HomeContentComponent } from './home/components/home-content/home-content.component';
import { CartComponent } from './cart/cart.component';

const Components = [
  AppComponent,
  HomeComponent,
  HomeSliderComponent,
  HomeContentComponent,
  ShopComponent,
  ShopContentComponent,
  ShopFilterComponent,
  ShopDetailComponent,
];

@NgModule({
  declarations: [...Components, CartComponent],
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
