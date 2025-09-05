import { Routes } from '@angular/router';
import { CalenderComponent } from './calendar.component';

export default  [
  {
    path: '',
    component: CalenderComponent,
    data: {
      title: 'Calender Basic',
      breadcrumb: 'Calender Basic'
    }
  }
] as Routes; 


export class CalenderRoutingModule { }
