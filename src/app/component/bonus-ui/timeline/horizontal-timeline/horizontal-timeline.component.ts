import { Component } from '@angular/core';
import { horizontalTimeline } from '../../../../shared/data/data/bonus-ui/timeline';

@Component({
    selector: 'app-horizontal-timeline',
    templateUrl: './horizontal-timeline.component.html',
    styleUrls: ['./horizontal-timeline.component.scss'],
    standalone: true
})
export class HorizontalTimelineComponent {

  public horizontalTimelineData = horizontalTimeline;

}
