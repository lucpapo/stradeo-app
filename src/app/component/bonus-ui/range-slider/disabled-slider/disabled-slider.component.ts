import { NgxSliderModule, Options } from "@angular-slider/ngx-slider";
import { Component } from "@angular/core";

@Component({
  selector: "app-disabled-slider",
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: "./disabled-slider.component.html",
  styleUrls: ["./disabled-slider.component.scss"],
})

export class DisabledSliderComponent {
  
  public value: number = 550;

  public options: Options = {
    floor: 100,
    ceil: 1000,
    disabled: true,
  };
}
