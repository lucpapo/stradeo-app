import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';

@Component({
  selector: 'app-min-max-value-slider',
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: './min-max-value-slider.component.html',
  styleUrls: ['./min-max-value-slider.component.scss']
})

export class MinMaxValueSliderComponent {

  public value: number = 100;
  public maxvalue: number = 70;
  public options: Options = {
    floor: 0,
    ceil: 200
  };

}
