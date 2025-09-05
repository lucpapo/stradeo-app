import { Component } from '@angular/core';
import { GroupingComponent } from './grouping/grouping.component';
import { RatioComponent } from './ratio/ratio.component';
import { ShapesComponent } from './shapes/shapes.component';
import { StatusIndicatorComponent } from './status-indicator/status-indicator.component';
import { SizesComponent } from './sizes/sizes.component';

@Component({
    selector: 'app-avatars',
    templateUrl: './avatars.component.html',
    styleUrls: ['./avatars.component.scss'],
    standalone: true,
    imports: [SizesComponent, StatusIndicatorComponent, ShapesComponent, RatioComponent, GroupingComponent]
})
export class AvatarsComponent {

}
