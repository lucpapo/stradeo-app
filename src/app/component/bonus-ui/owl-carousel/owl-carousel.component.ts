import { Component } from '@angular/core';
import { DarkVariantComponent } from './dark-variant/dark-variant.component';
import { DisableTouchSwipingComponent } from './disable-touch-swiping/disable-touch-swiping.component';
import { IndividualIntervalComponent } from './individual-interval/individual-interval.component';
import { CrossFadeComponent } from './cross-fade/cross-fade.component';
import { WithCaptionsComponent } from './with-captions/with-captions.component';
import { WithIndicatorsComponent } from './with-indicators/with-indicators.component';
import { MouseWheelVariantComponent } from './mouse-wheel-variant/mouse-wheel-variant.component';
import { AutoPlayVariantComponent } from './auto-play-variant/auto-play-variant.component';
import { WithControlsComponent } from './with-controls/with-controls.component';
import { SlidesOnlyComponent } from './slides-only/slides-only.component';

@Component({
    selector: 'app-owl-carousel',
    templateUrl: './owl-carousel.component.html',
    styleUrls: ['./owl-carousel.component.scss'],
    standalone: true,
    imports: [SlidesOnlyComponent, WithControlsComponent, AutoPlayVariantComponent, MouseWheelVariantComponent, WithIndicatorsComponent, WithCaptionsComponent, CrossFadeComponent, IndividualIntervalComponent, DisableTouchSwipingComponent, DarkVariantComponent]
})
export class OwlCarouselComponent {

}
