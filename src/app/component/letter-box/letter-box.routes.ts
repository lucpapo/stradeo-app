import { Routes } from '@angular/router';
import { EmailComponent } from './email.component';

export default  [
      {
        path: '',
        component: EmailComponent,
        data: {
          title: 'Letter Box',
          breadcrumb: 'Letter Box',
        }
      }
    
] as Routes; 
