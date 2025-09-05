import { Component } from '@angular/core';
import { upcomingCourse } from '../../../../shared/data/data/learning';
import { NgbRatingConfig, NgbCollapse, NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-upcoming-course',
    templateUrl: './upcoming-course.component.html',
    styleUrls: ['./upcoming-course.component.scss'],
    standalone: true,
    imports: [NgbCollapse, NgbRating]
})
export class UpcomingCoursesComponent {

  public upcomingCourse = upcomingCourse;
  public isCollapsed = false;

  constructor(public config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
}

