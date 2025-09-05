import { Component } from '@angular/core';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { jobCardsData } from '../../../../shared/data/data/job-search';
import { SlicePipe } from '@angular/common';

@Component({
    selector: 'app-job-similar',
    templateUrl: './job-similar.component.html',
    styleUrls: ['./job-similar.component.scss'],
    standalone: true,
    imports: [NgbRating, SlicePipe]
})
export class JobSimilarComponent {

  public jobCardsData = jobCardsData;

  constructor(public config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

}
