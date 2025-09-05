import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';
import { TranslucentToasts } from '../../../../shared/data/data/bonus-ui/toasts';

@Component({
    selector: 'app-translucent-toasts',
    templateUrl: './translucent-toasts.component.html',
    styleUrls: ['./translucent-toasts.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})

export class TranslucentToastsComponent {

  public TranslucentToastsData = TranslucentToasts;

  close(value: number) {
    const items = this.TranslucentToastsData.filter(v => v.id == value)
    items[0].data = false;
  }

}
