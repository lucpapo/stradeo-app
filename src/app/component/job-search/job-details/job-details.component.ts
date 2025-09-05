import { Component } from '@angular/core';
import { jobDetail } from '../../../shared/data/data/job-search';
import { SlicePipe } from '@angular/common';
import { JobSimilarComponent } from './job-similar/job-similar.component';
import { JobFilterComponent } from '../job-filter/job-filter.component';

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss'],
    standalone: true,
    imports: [JobFilterComponent, JobSimilarComponent, SlicePipe]
})

export class JobDetailsComponent {

  public jobDetail = jobDetail;

}
