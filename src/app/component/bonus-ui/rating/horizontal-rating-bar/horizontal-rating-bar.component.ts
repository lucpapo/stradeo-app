import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

@Component({
    selector: 'app-horizontal-rating-bar',
    templateUrl: './horizontal-rating-bar.component.html',
    styleUrls: ['./horizontal-rating-bar.component.scss'],
    standalone: true,
    imports: [BarRatingModule]
})
export class HorizontalRatingBarComponent {

  verticalRate = 1;

}
