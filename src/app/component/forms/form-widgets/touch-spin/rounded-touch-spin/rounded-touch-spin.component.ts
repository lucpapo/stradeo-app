import { Component } from '@angular/core';
import { roundedTouchSpin } from '../../../../../shared/data/data/forms/forms-widgets/touchSpin';

@Component({
    selector: 'app-rounded-touch-spin',
    templateUrl: './rounded-touch-spin.component.html',
    styleUrls: ['./rounded-touch-spin.component.scss'],
    standalone: true
})
export class RoundedTouchSpinComponent {

  public roundedData = roundedTouchSpin;

  decrement(i: number) {
    if (this.roundedData[i].value > 0) {
      this.roundedData[i].value -= 1;
    }
  }
  increment(i: number) {
    this.roundedData[i].value += 1;
  }


}
