import { Component } from '@angular/core';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { HorizontalTimelineComponent } from './horizontal-timeline/horizontal-timeline.component';
import { VariationTimelineComponent } from './variation-timeline/variation-timeline.component';
import { HoveringTimelineComponent } from './hovering-timeline/hovering-timeline.component';
import { BasicTimelineComponent } from './basic-timeline/basic-timeline.component';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    standalone: true,
    imports: [BasicTimelineComponent, HoveringTimelineComponent, VariationTimelineComponent, HorizontalTimelineComponent, TimelineChartComponent]
})
export class TimelineComponent {

}
