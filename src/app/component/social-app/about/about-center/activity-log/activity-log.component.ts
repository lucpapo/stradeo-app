import { Component } from '@angular/core';
import * as data from '../../../../../shared/data/data/social-media-data';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-activity-log',
    templateUrl: './activity-log.component.html',
    styleUrls: ['./activity-log.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class ActivityLogComponent {

  public activityLogData = data.activityLog;

}
