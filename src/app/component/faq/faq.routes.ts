import { Routes } from '@angular/router';
import { FaqComponent } from './faq.component';

export default  [
  {
    path : '',
    component : FaqComponent,
    data : {
      title : 'FAQ',
      breadcrumb : 'FAQ'
    }
  }
] as Routes; 


export class FaqRoutingModule { }
