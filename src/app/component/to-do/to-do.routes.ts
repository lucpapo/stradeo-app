import { Routes } from '@angular/router';
import { ToDoComponent } from './to-do.component';

export default  [
  {
    path: '',
    component: ToDoComponent,
    data: {
      title: 'To-Do',
      breadcrumb: 'To-Do'
    }
  }
] as Routes; 
