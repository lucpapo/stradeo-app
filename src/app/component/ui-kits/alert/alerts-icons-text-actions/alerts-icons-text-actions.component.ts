import { Component } from '@angular/core';
import * as data from '../../../../shared/data/data/ui-kits/alert';

@Component({
    selector: 'app-alerts-icons-text-actions',
    templateUrl: './alerts-icons-text-actions.component.html',
    styleUrls: ['./alerts-icons-text-actions.component.scss'],
    standalone: true
})
export class AlertsIconsTextActionsComponent {

  public iconTextData = data.iconAndTextAlert;

  close(iconTextItem: data.Icons) {
    this.iconTextData.splice(this.iconTextData.indexOf(iconTextItem), 1);
  }

}
