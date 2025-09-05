import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

@Component({
    selector: 'app-one-to-ten-rating-bar',
    templateUrl: './one-to-ten-rating-bar.component.html',
    styleUrls: ['./one-to-ten-rating-bar.component.scss'],
    standalone: true,
    imports: [BarRatingModule]
})
export class OneToTenRatingBarComponent {

  public faRate = 7;

}
