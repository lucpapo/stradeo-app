import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sliderwithcustomstyle',
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: './sliderwithcustomstyle.component.html',
  styleUrl: './sliderwithcustomstyle.component.scss'
})

export class SliderwithcustomstyleComponent {

  value: number = 10;
  highValue: number = 90;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true
  };

}
