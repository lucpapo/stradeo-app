import { Routes } from '@angular/router';
import { ClipboardComponent } from './clipboard/clipboard.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { Select2Component } from './select2/select2.component';
import { SwitchComponent } from './switch/switch.component';
import { TouchSpinComponent } from './touch-spin/touch-spin.component';
import { TypeAheadComponent } from './type-ahead/type-ahead.component';

export default [
  {
    path: 'datepicker',
    component: DatepickerComponent,
    data: {
      title: "Datepicker",
      breadcrumb: "Datepicker",
    }
  },
  {
    path: 'touchspin',
    component: TouchSpinComponent,
    data: {
      title: "Touchspin",
      breadcrumb: "Touchspin",
    }
  },
  {
    path: 'select2',
    component: Select2Component,
    data: {
      title: "Select2",
      breadcrumb: "Select2",
    }
  },
  {
    path: 'switch',
    component: SwitchComponent,
    data: {
      title: "Switch",
      breadcrumb: "Switch",
    }
  },
  {
    path: 'typeahead',
    component: TypeAheadComponent,
    data: {
      title: "Typeahead",
      breadcrumb: "Typeahead",
    }
  },
  {
    path: 'clipboard',
    component: ClipboardComponent,
    data: {
      title: "Clipboard",
      breadcrumb: "Clipboard",
    }
  },
] as Routes;
