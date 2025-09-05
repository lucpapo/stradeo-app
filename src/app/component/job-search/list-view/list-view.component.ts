import { Component } from '@angular/core';
import { jobCardsData } from '../../../shared/data/data/job-search';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { SlicePipe } from '@angular/common';
import { JobFilterComponent } from '../job-filter/job-filter.component';

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss'],
    standalone: true,
    imports: [JobFilterComponent, NgbRating, SlicePipe]
})
export class ListViewComponent {

  public jobCardsData = jobCardsData;
  public rating = 5;

  constructor(public config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

}
