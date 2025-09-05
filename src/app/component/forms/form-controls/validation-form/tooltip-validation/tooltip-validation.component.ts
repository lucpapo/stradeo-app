import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-tooltip-validation',
    templateUrl: './tooltip-validation.component.html',
    styleUrls: ['./tooltip-validation.component.scss'],
    standalone: true,
    imports: [FormsModule, CommonModule]
})
export class TooltipValidationComponent {

  public validate = false;
  public tooltipValidation = false;

  public submit() {
    this.validate = !this.validate;
  }
  public tooltipSubmit() {
    this.tooltipValidation = !this.tooltipValidation;
  }


}
