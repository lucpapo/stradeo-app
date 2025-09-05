import { Component } from '@angular/core';
import { TimelineRightComponent } from './timeline-right/timeline-right.component';
import { TimelineCenterComponent } from './timeline-center/timeline-center.component';
import { TimelineLeftComponent } from './timeline-left/timeline-left.component';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    standalone: true,
    imports: [TimelineLeftComponent, TimelineCenterComponent, TimelineRightComponent]
})
export class TimelineComponent {

}
