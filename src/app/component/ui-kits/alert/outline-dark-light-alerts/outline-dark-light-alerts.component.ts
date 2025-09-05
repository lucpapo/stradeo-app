import { Component } from '@angular/core';
import * as data from '../../../../shared/data/data/ui-kits/alert';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-outline-dark-light-alerts',
    templateUrl: './outline-dark-light-alerts.component.html',
    styleUrls: ['./outline-dark-light-alerts.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})

export class OutlineDarkLightAlertsComponent {

  public outlineAlertData = data.outlineDarkAlert;

  close(outlineItem: data.Alert) {
    this.outlineAlertData.splice(this.outlineAlertData.indexOf(outlineItem), 1);
  }

}
