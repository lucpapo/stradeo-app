import { NgxSliderModule, Options } from "@angular-slider/ngx-slider";
import { Component } from "@angular/core";

@Component({
  selector: "app-default-slider",
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: "./default-slider.component.html",
  styleUrls: ["./default-slider.component.scss"],
})

export class DefaultSliderComponent {
  
  public value: number = 550;
  public options: Options = {
    floor: 100,
    ceil: 1000,
  };
}
