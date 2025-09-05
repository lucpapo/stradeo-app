import { Component } from '@angular/core';
import { FilledTooltipComponent } from './filled-tooltip/filled-tooltip.component';
import { HoverEffectComponent } from './hover-effect/hover-effect.component';
import { TooltipDirectionsComponent } from './tooltip-directions/tooltip-directions.component';
import { ColoredTooltipComponent } from './colored-tooltip/colored-tooltip.component';
import { BasicTooltipComponent } from './basic-tooltip/basic-tooltip.component';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    standalone: true,
    imports: [BasicTooltipComponent, ColoredTooltipComponent, TooltipDirectionsComponent, HoverEffectComponent, FilledTooltipComponent]
})
export class TooltipComponent {

}
