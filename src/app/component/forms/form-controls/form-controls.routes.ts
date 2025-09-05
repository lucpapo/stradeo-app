import { Routes } from '@angular/router';
import { BaseInputsComponent } from './base-inputs/base-inputs.component';
import { CheckboxRadioComponent } from './checkbox-radio/checkbox-radio.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { InputMaskComponent } from './input-mask/input-mask.component';
import { MegaOptionsComponent } from './mega-options/mega-options.component';
import { ValidationFormComponent } from './validation-form/validation-form.component';

export default [
  {
    path: 'validation-forms',
    component: ValidationFormComponent,
    data: {
      title: "Validation Form",
      breadcrumb: "Validation Form",
    }
  },
  {
    path: 'base-inputs',
    component: BaseInputsComponent,
    data: {
      title: "Base Inputs",
      breadcrumb: "Base Inputs",
    }
  },
  {
    path: 'checkbox-radio',
    component: CheckboxRadioComponent,
    data: {
      title: "Checkbox & Radio",
      breadcrumb: "Checkbox-Radio",
    }
  },
  {
    path: 'input-groups',
    component: InputGroupsComponent,
    data: {
      title: "Input Groups",
      breadcrumb: "Input Groups",
    }
  },
  {
    path: 'input-mask',
    component: InputMaskComponent,
    data: {
      title: "Input Mask",
      breadcrumb: "Input Mask",
    }
  },
  {
    path: 'mega-options',
    component: MegaOptionsComponent,
    data: {
      title: "Mega Options",
      breadcrumb: "Mega Options",
    }
  },
] as Routes;
