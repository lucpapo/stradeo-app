import { Component } from '@angular/core';
import { StackingToasts } from '../../../../shared/data/data/bonus-ui/toasts';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-stacking-toasts',
    templateUrl: './stacking-toasts.component.html',
    styleUrls: ['./stacking-toasts.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class StackingToastsComponent {

  public stackingData = StackingToasts;

  close(value: number) {
    const items = this.stackingData.filter(v => v.id == value)
    items[0].data = false;
  }

}
