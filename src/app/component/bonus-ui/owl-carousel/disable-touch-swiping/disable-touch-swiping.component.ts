import { Component } from '@angular/core';
import { disabled, disabledOptions } from '../../../../shared/data/data/bonus-ui/owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-disable-touch-swiping',
    templateUrl: './disable-touch-swiping.component.html',
    styleUrl: './disable-touch-swiping.component.scss',
    standalone: true,
    imports: [CarouselModule]
})

export class DisableTouchSwipingComponent {

  public disabled = disabled ;
  public disabledOptions = disabledOptions ;

}
