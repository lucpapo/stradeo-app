import { Component } from '@angular/core';
import { CurrentRatingBarComponent } from './current-rating-bar/current-rating-bar.component';
import { HorizontalRatingBarComponent } from './horizontal-rating-bar/horizontal-rating-bar.component';
import { StarRatingBarComponent } from './star-rating-bar/star-rating-bar.component';
import { SquareRatingBarComponent } from './square-rating-bar/square-rating-bar.component';
import { MovieRatingBarComponent } from './movie-rating-bar/movie-rating-bar.component';
import { OneToTenRatingBarComponent } from './one-to-ten-rating-bar/one-to-ten-rating-bar.component';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    standalone: true,
    imports: [OneToTenRatingBarComponent, MovieRatingBarComponent, SquareRatingBarComponent, StarRatingBarComponent, HorizontalRatingBarComponent, CurrentRatingBarComponent]
})
export class RatingComponent {

}
