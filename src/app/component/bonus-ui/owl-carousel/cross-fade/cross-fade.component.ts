import { Component } from '@angular/core';
import { crossFadeData, crossFadeOptions } from '../../../../shared/data/data/bonus-ui/owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-cross-fade',
    templateUrl: './cross-fade.component.html',
    styleUrls: ['./cross-fade.component.scss'],
    standalone: true,
    imports: [CarouselModule]
})

export class CrossFadeComponent {

  public crossFadeOptions = crossFadeOptions;
  public crossFadeData = crossFadeData;

}
