import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dismissing-light-alerts',
    templateUrl: './dismissing-light-alerts.component.html',
    styleUrls: ['./dismissing-light-alerts.component.scss'],
    standalone: true,
    imports: [CommonModule, FeatherIconComponent]
})
export class DismissingLightAlertsComponent {

  public alerts2: boolean = true;

  close2() {
    this.alerts2 = false;
  }

}
