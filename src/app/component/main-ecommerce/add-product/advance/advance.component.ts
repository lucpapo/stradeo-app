import { Component, EventEmitter, Output } from '@angular/core';
import { ShippingComponent } from './shipping/shipping.component';
import { AdditionalOptionsComponent } from './additional-options/additional-options.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-advance',
    templateUrl: './advance.component.html',
    styleUrls: ['./advance.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, InventoryComponent, 
      AdditionalOptionsComponent, ShippingComponent,NgbNavModule]
})
export class AdvanceComponent {

  @Output() activeSteps = new EventEmitter<number>();
  public active = 1;
  public activeStep: number = 5;

  previous() {
    const number = this.activeStep - 1;
    this.activeSteps.emit(number);
  }

}
