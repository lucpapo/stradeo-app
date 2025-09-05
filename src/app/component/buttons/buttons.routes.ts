import { Routes } from '@angular/router';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { DefaultStyleComponent } from './default-style/default-style.component';

export default [
  {
    path: 'default-style',
    component: DefaultStyleComponent,
    data: {
      title: "Default Style",
      breadcrumb: "Default Style",

    }
  },
  {
    path: 'button-group',
    component: ButtonGroupComponent,
    data: {
      title: "Button Group",
      breadcrumb: "Button Group",

    }
  }
] as Routes;

