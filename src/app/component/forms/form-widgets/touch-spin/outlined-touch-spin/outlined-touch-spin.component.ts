import { Component } from '@angular/core';
import { outlinedTouchSpin } from '../../../../../shared/data/data/forms/forms-widgets/touchSpin';

@Component({
    selector: 'app-outlined-touch-spin',
    templateUrl: './outlined-touch-spin.component.html',
    styleUrls: ['./outlined-touch-spin.component.scss'],
    standalone: true
})

export class OutlinedTouchSpinComponent {

  public outlinedData = outlinedTouchSpin;

  decrement(i: number) {
    if (this.outlinedData[i].value > 0) {
      this.outlinedData[i].value -= 1;
    }
  }
  increment(i: number) {
    this.outlinedData[i].value += 1;
  }

}
