import { Component } from '@angular/core';
import { autoPlayData, autoPlayOptions } from '../../../../shared/data/data/bonus-ui/owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-auto-play-variant',
    templateUrl: './auto-play-variant.component.html',
    styleUrls: ['./auto-play-variant.component.scss'],
    standalone: true,
    imports: [CarouselModule]
})

export class AutoPlayVariantComponent {

  public autoPlayOptions = autoPlayOptions;
  public autoPlayData = autoPlayData;

}
