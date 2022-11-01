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
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import {
  FooterComponent,
  HeaderComponent,
  ProductCardComponent,
  SkeletonComponent,
  ErrorComponent,
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
  NzEmptyModule
];
const SharedComponents = [
  HeaderComponent,
  FooterComponent,
  ProductCardComponent,
  SkeletonComponent,
  ErrorComponent,
];

@NgModule({
  declarations: [...SharedComponents, ErrorComponent],
  imports: [...SharedModules],
  exports: [...SharedModules, ...SharedComponents],
})
export class SharedModule {}
