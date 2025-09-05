import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

@Component({
    selector: 'app-square-rating-bar',
    templateUrl: './square-rating-bar.component.html',
    styleUrls: ['./square-rating-bar.component.scss'],
    standalone: true,
    imports: [BarRatingModule]
})
export class SquareRatingBarComponent {

 public squareRate = 1;

}
