import { Component } from '@angular/core';
import { slideOnly, slidesOptions } from '../../../../shared/data/data/bonus-ui/owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-slides-only',
    templateUrl: './slides-only.component.html',
    styleUrls: ['./slides-only.component.scss'],
    standalone: true,
    imports: [CarouselModule]
})
export class SlidesOnlyComponent {

  public slidesData = slideOnly;
  public slidesOptionData = slidesOptions;

}
