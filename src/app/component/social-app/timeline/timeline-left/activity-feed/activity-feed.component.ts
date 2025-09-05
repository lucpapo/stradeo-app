import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import * as data from '../../../../../shared/data/data/social-media-data';

@Component({
    selector: 'app-activity-feed',
    templateUrl: './activity-feed.component.html',
    styleUrls: ['./activity-feed.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule]
})
export class ActivityFeedComponent {

  public isCollapsed = false;
  public activityFeedData = data.activityFeedData;

}
