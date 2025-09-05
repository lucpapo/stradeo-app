import { Component } from '@angular/core';
import { basicTimeline } from '../../../../shared/data/data/bonus-ui/timeline';

@Component({
    selector: 'app-basic-timeline',
    templateUrl: './basic-timeline.component.html',
    styleUrls: ['./basic-timeline.component.scss'],
    standalone: true
})
export class BasicTimelineComponent {

  public basicTimelineData = basicTimeline;

}
