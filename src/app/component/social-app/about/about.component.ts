import { Component } from '@angular/core';
import { TimelineRightComponent } from '../timeline/timeline-right/timeline-right.component';
import { AboutCenterComponent } from './about-center/about-center.component';
import { TimelineLeftComponent } from '../timeline/timeline-left/timeline-left.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    standalone: true,
    imports: [TimelineLeftComponent, AboutCenterComponent, TimelineRightComponent]
})
export class AboutComponent {

}
