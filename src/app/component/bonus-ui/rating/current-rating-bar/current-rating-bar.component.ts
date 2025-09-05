import { Component } from '@angular/core';
import { FaIconLibrary, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FormControl, Validators } from '@angular/forms';
import { BarRatingModule } from 'ngx-bar-rating';

@Component({
    selector: 'app-current-rating-bar',
    templateUrl: './current-rating-bar.component.html',
    styleUrls: ['./current-rating-bar.component.scss'],
    standalone: true,
    imports: [BarRatingModule, FaIconComponent]
})

export class CurrentRatingBarComponent {

  faoRate = 5.6;
  faoRated = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(faStar, faStarHalfAlt, farStar, faTimesCircle);
  }
  
  onFaoRate(e: number) {
    this.faoRated = true;
    this.faoRate = e;
  }
  ctrl = new FormControl<number | null>(null, Validators.required);

  faoReset() {
    this.faoRated = false;
    this.faoRate = 5.6;
  }


}
