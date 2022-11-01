import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Navigation } from 'swiper';

import { ISliderData } from 'src/app/core/models';
import { SliderData } from '../../constants';

SwiperCore.use([Autoplay, Navigation]);

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
})
export class HomeSliderComponent implements OnInit {
  sliderData: ISliderData[] = SliderData;

  constructor() {}

  ngOnInit(): void {}
}
