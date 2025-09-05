import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-products-details',
    templateUrl: './add-products-details.component.html',
    styleUrls: ['./add-products-details.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule, AngularEditorModule]
})
export class AddProductsDetailsComponent {

  public validate: boolean = false;
  public activeStep: number = 1;
  public htmlContent = '';
  public productForm: FormGroup;

  @Output() activeSteps = new EventEmitter<number>();

  constructor() {
    this.productForm = new FormGroup({
      product_Title: new FormControl("", Validators.required),
      text: new FormControl(""),
    })
  }

  next(myForm: FormGroup) {
    this.validate = true;
    if (this.productForm.valid) {
      const number = this.activeStep + 1;
      this.activeSteps.emit(number);
    }
  }

  get productTitle() {
    return this.productForm.get('product_Title');
  }



}
