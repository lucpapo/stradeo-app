import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-left-border-alert',
    templateUrl: './left-border-alert.component.html',
    styleUrls: ['./left-border-alert.component.scss'],
    standalone: true,
    imports: [CommonModule, FeatherIconComponent]
})
export class LeftBorderAlertComponent {

  public alerts3: boolean = true;

  close3() {
    this.alerts3 = false;
  }

}
