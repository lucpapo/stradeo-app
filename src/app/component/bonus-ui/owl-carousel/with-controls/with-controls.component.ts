import { Component } from '@angular/core';
import { withControlsOptions, withControls } from '../../../../shared/data/data/bonus-ui/owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';


@Component({
    selector: 'app-with-controls',
    templateUrl: './with-controls.component.html',
    styleUrls: ['./with-controls.component.scss'],
    standalone: true,
    imports: [CarouselModule]
})
export class WithControlsComponent {

  public withControls = withControls;
  public withControlsOptions = withControlsOptions;

}
