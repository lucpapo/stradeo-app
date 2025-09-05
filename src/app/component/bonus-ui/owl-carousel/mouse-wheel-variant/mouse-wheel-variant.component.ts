import { Component } from '@angular/core';
import { autoPlayData, autoPlayOptions } from '../../../../shared/data/data/bonus-ui/owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-mouse-wheel-variant',
    templateUrl: './mouse-wheel-variant.component.html',
    styleUrls: ['./mouse-wheel-variant.component.scss'],
    standalone: true,
    imports: [CarouselModule]
})

export class MouseWheelVariantComponent {

  public autoPlayOptions = autoPlayOptions;
  public autoPlayData = autoPlayData;

}
