import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

@Component({
    selector: 'app-movie-rating-bar',
    templateUrl: './movie-rating-bar.component.html',
    styleUrls: ['./movie-rating-bar.component.scss'],
    standalone: true,
    imports: [BarRatingModule]
})
export class MovieRatingBarComponent {

  public movieRate = 2;

}
