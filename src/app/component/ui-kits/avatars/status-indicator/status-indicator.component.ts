import { Component } from '@angular/core';
import { statusIndicator } from '../../../../shared/data/data/ui-kits/avavtar';

@Component({
    selector: 'app-status-indicator',
    templateUrl: './status-indicator.component.html',
    styleUrls: ['./status-indicator.component.scss'],
    standalone: true
})
export class StatusIndicatorComponent {

  public statusIndicatorData = statusIndicator;

}
