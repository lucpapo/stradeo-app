import { Component } from '@angular/core';
import { PopoverOffsetComponent } from './popover-offset/popover-offset.component';
import { PopoverDirectionComponent } from './popover-direction/popover-direction.component';
import { BasicPopoverComponent } from './basic-popover/basic-popover.component';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
    standalone: true,
    imports: [BasicPopoverComponent, PopoverDirectionComponent, PopoverOffsetComponent]
})
export class PopoverComponent {

}
