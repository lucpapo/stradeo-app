import { Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';

export default  [
  {
    path: '',
    component: TasksComponent,
    data: {
      title: 'Tasks',
      breadcrumb: 'Tasks'
    }
  }
] as Routes; 
