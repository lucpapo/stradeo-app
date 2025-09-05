import { Component } from '@angular/core';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { jobCardsData } from '../../../shared/data/data/job-search';
import { JobFilterComponent } from '../job-filter/job-filter.component';

@Component({
    selector: 'app-cards-view',
    templateUrl: './cards-view.component.html',
    styleUrls: ['./cards-view.component.scss'],
    standalone: true,
    imports: [JobFilterComponent, NgbRating]
})
export class CardsViewComponent {

  public jobCardsData = jobCardsData;

  constructor(public config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

}
