import { Component } from '@angular/core';
import { withIndicatorData, withIndicatorOptions } from '../../../../shared/data/data/bonus-ui/owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-with-indicators',
    templateUrl: './with-indicators.component.html',
    styleUrls: ['./with-indicators.component.scss'],
    standalone: true,
    imports: [CarouselModule]
})

export class WithIndicatorsComponent {
  public withIndicatorOptions = withIndicatorOptions;
  public withIndicatorData = withIndicatorData;
}
