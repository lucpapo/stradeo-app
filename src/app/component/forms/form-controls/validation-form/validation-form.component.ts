import { Component } from '@angular/core';
import { FormsValidationComponent } from './forms-validation/forms-validation.component';
import { BrowserDefaultsComponent } from './browser-defaults/browser-defaults.component';
import { TooltipValidationComponent } from './tooltip-validation/tooltip-validation.component';

@Component({
    selector: 'app-validation-form',
    templateUrl: './validation-form.component.html',
    styleUrls: ['./validation-form.component.scss'],
    standalone: true,
    imports: [TooltipValidationComponent, BrowserDefaultsComponent, FormsValidationComponent]
})
export class ValidationFormComponent {

}
