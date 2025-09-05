import { Routes } from '@angular/router';
import { DetailedCourseComponent } from './detailed-course/detailed-course.component';
import { LearningListComponent } from './learning-list/learning-list.component';

export default  [
  {
    path : 'learning-list',
    component : LearningListComponent,
    data : {
      title : 'Learning List',
      breadcrumb : 'Learning List'
    }
  },
  {
    path : 'detailed-course',
    component :  DetailedCourseComponent,
    data : {
      title : 'Detailed Course',
      breadcrumb : 'Detailed Course'
    }
  }
] as Routes; 
