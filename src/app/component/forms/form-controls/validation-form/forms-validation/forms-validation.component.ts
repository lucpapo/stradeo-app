import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-forms-validation',
    templateUrl: './forms-validation.component.html',
    styleUrls: ['./forms-validation.component.scss'],
    standalone: true,
    imports: [FormsModule, CommonModule]
})
export class FormsValidationComponent {

  public validate = false;

  public submit() {
    this.validate = !this.validate;
  }

}
