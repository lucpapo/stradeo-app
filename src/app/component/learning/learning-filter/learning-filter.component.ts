import { Component } from '@angular/core';
import { findCourse } from '../../../shared/data/data/learning';
import { UpcomingCoursesComponent } from './upcoming-course/upcoming-course.component';
import { CategoriesComponent } from './categories/categories.component';
import { FindCourseComponent } from './find-course/find-course.component';
import { ClickOutsideDirective } from '../../../shared/directive/outside.directive';

@Component({
    selector: 'app-learning-filter',
    templateUrl: './learning-filter.component.html',
    styleUrls: ['./learning-filter.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, FindCourseComponent, CategoriesComponent, UpcomingCoursesComponent]
})

export class LearningFilterComponent {

  public findCourse = findCourse;
  public isCollapsed : boolean = false;

  openFilter(){
    this.isCollapsed =! this.isCollapsed;
  }

  clickOutside():void { 
    this.isCollapsed = false;
  }
  
}
