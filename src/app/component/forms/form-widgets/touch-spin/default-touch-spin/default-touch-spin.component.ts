import { Component } from '@angular/core';
import { touchSpin } from '../../../../../shared/data/data/forms/forms-widgets/touchSpin';

@Component({
    selector: 'app-default-touch-spin',
    templateUrl: './default-touch-spin.component.html',
    styleUrls: ['./default-touch-spin.component.scss'],
    standalone: true
})
export class DefaultTouchSpinComponent {

  public touchSpinData = touchSpin;

  decrement(i: number) {
    if (this.touchSpinData[i].value > 0) {
      this.touchSpinData[i].value -= 1;
    }
  }
  increment(i: number) {
    this.touchSpinData[i].value += 1;
  }

}
