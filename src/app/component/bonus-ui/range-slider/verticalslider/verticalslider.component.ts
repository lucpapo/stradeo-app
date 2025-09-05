import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';

@Component({
  selector: 'app-verticalslider',
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: './verticalslider.component.html',
  styleUrl: './verticalslider.component.scss'
})

export class VerticalsliderComponent {

  value: number = 5;
  options: Options = {
    floor: 0,
    ceil: 10,
    vertical: true
  };

}
