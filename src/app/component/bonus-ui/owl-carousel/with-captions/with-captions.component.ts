import { Component } from '@angular/core';
import { withCaptionData, withIndicatorOptions } from '../../../../shared/data/data/bonus-ui/owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-with-captions',
    templateUrl: './with-captions.component.html',
    styleUrls: ['./with-captions.component.scss'],
    standalone: true,
    imports: [CarouselModule]
})

export class WithCaptionsComponent {

  public withIndicatorOptions = withIndicatorOptions;
  public withCaptionData = withCaptionData;

}
