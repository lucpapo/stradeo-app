import { Component } from '@angular/core';
import { findCourse } from '../../../../shared/data/data/learning';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-find-course',
    templateUrl: './find-course.component.html',
    styleUrls: ['./find-course.component.scss'],
    standalone: true,
    imports: [NgbCollapse, FeatherIconComponent]
})
export class FindCourseComponent {

  public findCourse = findCourse;
  public isCollapsed = false;

}
