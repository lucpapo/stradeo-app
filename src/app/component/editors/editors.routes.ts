import { Routes } from '@angular/router';
import { MdeEditorsComponent } from './mde-editors/mde-editors.component';
import { NgxEditorComponent } from './ngx-editor/ngx-editor.component';

export default [
  {
    path: 'ngx-editor',
    component: NgxEditorComponent,
    data: {
      title: 'Ngx Editor',
      breadcrumb: 'Ngx Editor'
    }
  },
  {
    path: 'angular-editor',
    component: MdeEditorsComponent,
    data: {
      title: 'Angular Editor ',
      breadcrumb: 'Angular Editor '
    }
  }
] as Routes;
