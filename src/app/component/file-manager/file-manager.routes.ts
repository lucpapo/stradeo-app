import { Routes } from '@angular/router';
import { FileManagerComponent } from './file-manager.component';

export default  [
  {
    path: '',
    component: FileManagerComponent,
    data: {
      title: 'File Manager',
      breadcrumb: 'File Manager',
    }
  }
] as Routes; 
