import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

@Component({
    selector: 'app-star-rating-bar',
    templateUrl: './star-rating-bar.component.html',
    styleUrls: ['./star-rating-bar.component.scss'],
    standalone: true,
    imports: [BarRatingModule]
})
export class StarRatingBarComponent {

 public cssRate = 1;

}
