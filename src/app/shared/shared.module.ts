import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SwiperModule } from 'swiper/angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import {
  FooterComponent,
  HeaderComponent,
  ProductCardComponent,
  SkeletonComponent,
} from './components';

const SharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  RouterModule,
  SwiperModule,
  InfiniteScrollModule,
  NzSpinModule,
  NzBadgeModule,
  NzIconModule,
  NzButtonModule,
  NzImageModule,
  NzSpaceModule,
  NzToolTipModule,
  NzSelectModule,
  NzInputModule,
  NzBreadCrumbModule,
  NzDividerModule,
];
const SharedComponents = [
  HeaderComponent,
  FooterComponent,
  ProductCardComponent,
  SkeletonComponent,
];

@NgModule({
  declarations: [...SharedComponents],
  imports: [...SharedModules],
  exports: [...SharedModules, ...SharedComponents],
})
export class SharedModule {}
