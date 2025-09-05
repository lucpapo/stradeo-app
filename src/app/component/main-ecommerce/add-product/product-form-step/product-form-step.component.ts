import { Component, Input } from '@angular/core';
import { step } from '../../../../shared/data/data/main-ecommerce/add-product';
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";

@Component({
    selector: 'app-product-form-step',
    templateUrl: './product-form-step.component.html',
    styleUrls: ['./product-form-step.component.scss'],
    standalone: true,
    imports: [CommonSvgIconsComponent]
})
export class ProductFormStepComponent {

  @Input() stepsData!: step [];
  @Input() activeSteps!: number;

}
