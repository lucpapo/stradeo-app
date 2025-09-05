import { Routes } from '@angular/router';
import { SocialAppComponent } from './social-app.component';

export default  [
  {
    path: '',
    component: SocialAppComponent,
    data: {
      title: 'Social App',
      breadcrumb: 'Social App'
    }
  }
] as Routes; 