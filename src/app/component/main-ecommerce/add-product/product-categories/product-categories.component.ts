import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { NewCategoriesComponent } from './new-categories/new-categories.component';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TagInputModule]
})

export class ProductCategoriesComponent {

  @Output() activeSteps = new EventEmitter<number>();
  public items = [];
  public activeStep: number = 3;
  public validate: boolean = false;
  public myForm: FormGroup;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      product: new FormControl('', Validators.required),
      productStatus: new FormControl('', Validators.required),
      addTag: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    })
  }

  next(myForm: FormGroup) {
    this.validate = true;
    if (this.myForm.valid) {
      const number = this.activeStep + 1;
      this.activeSteps.emit(number);
    }
  }

  newCategories() {
    const model = this.modalService.open(NewCategoriesComponent, { size: 'lg' });
  }

  previous() {
    const number = this.activeStep - 1;
    this.activeSteps.emit(number);
  }

}
