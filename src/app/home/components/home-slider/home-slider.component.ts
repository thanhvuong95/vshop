import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ISliderData } from 'src/app/core/models';
import { SliderData } from '../../constants';

import SwiperCore, { Autoplay, Navigation } from 'swiper';

SwiperCore.use([Autoplay, Navigation]);

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeSliderComponent implements OnInit {
  sliderData: ISliderData[] = SliderData;

  constructor() {}

  ngOnInit(): void {}
}
