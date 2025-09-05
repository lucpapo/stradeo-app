import { Component } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-basic-tooltip',
    templateUrl: './basic-tooltip.component.html',
    styleUrls: ['./basic-tooltip.component.scss'],
    standalone: true,
    imports: [NgbTooltip]
})
export class BasicTooltipComponent {

}
