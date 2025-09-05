import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-selling-price',
  templateUrl: './selling-price.component.html',
  styleUrls: ['./selling-price.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class SellingPriceComponent {

  @Output() activeSteps = new EventEmitter<number>();

  public activeStep: number = 4;
  public validate: boolean;
  public myForm: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup({
      initalcost: new FormControl('', Validators.required),
      sellingPrice: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      Productstocks: new FormControl('', Validators.required),
    })
  }

  next(myForm: FormGroup) {
    this.validate = true;
    if (this.myForm.valid) {
      const number = this.activeStep + 1;
      this.activeSteps.emit(number);
    }
  }

  previous() {
    const number = this.activeStep - 1;
    this.activeSteps.emit(number);
  }

}
