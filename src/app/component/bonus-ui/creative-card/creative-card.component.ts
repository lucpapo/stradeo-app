import { Component } from '@angular/core';
import { CommonAbsoluteCardComponent } from './common-absolute-card/common-absolute-card.component';
import { BorderSecondaryStateComponent } from './border-secondary-state/border-secondary-state.component';
import { BorderWarningStateComponent } from './border-warning-state/border-warning-state.component';
import { BorderPrimaryStateComponent } from './border-primary-state/border-primary-state.component';
import { CommonBorderCardComponent } from './common-border-card/common-border-card.component';

@Component({
    selector: 'app-creative-card',
    templateUrl: './creative-card.component.html',
    styleUrls: ['./creative-card.component.scss'],
    standalone: true,
    imports: [CommonBorderCardComponent, BorderPrimaryStateComponent, BorderWarningStateComponent, BorderSecondaryStateComponent, CommonAbsoluteCardComponent]
})
export class CreativeCardComponent {

}
