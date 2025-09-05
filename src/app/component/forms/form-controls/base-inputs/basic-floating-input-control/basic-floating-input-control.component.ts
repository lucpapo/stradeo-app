import { Component } from '@angular/core';
import { FormDetailsComponent } from './form-details/form-details.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-basic-floating-input-control',
    templateUrl: './basic-floating-input-control.component.html',
    styleUrls: ['./basic-floating-input-control.component.scss'],
    standalone: true,
    imports: [FormsModule, FormDetailsComponent]
})
export class BasicFloatingInputControlComponent {

  public validate = false;

  public submit() {
    this.validate = !this.validate;
  }


}
