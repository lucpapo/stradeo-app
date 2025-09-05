import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-dismissing-dark-alerts',
    templateUrl: './dismissing-dark-alerts.component.html',
    styleUrls: ['./dismissing-dark-alerts.component.scss'],
    standalone: true,
    imports: [CommonModule, FeatherIconComponent]
})
export class DismissingDarkAlertsComponent {

  public alerts: boolean = true;

  close() {
    this.alerts = false;
  }

}
