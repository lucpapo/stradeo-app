import { Routes } from '@angular/router';
import { SamplePageComponent } from './sample-page.component';

export default  [
{
    path: '',
    component: SamplePageComponent,
    data: {
      title: 'Sample Page',
      breadcrumb: 'Sample Page'
    }
  }
] as Routes; 
