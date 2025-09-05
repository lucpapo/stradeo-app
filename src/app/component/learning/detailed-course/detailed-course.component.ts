import { Component } from '@angular/core';
import { commentsData } from '../../../shared/data/data/learning';
import { LearningFilterComponent } from '../learning-filter/learning-filter.component';
import { CommentComponent } from './comment/comment.component';

@Component({
    selector: 'app-detailed-course',
    templateUrl: './detailed-course.component.html',
    styleUrls: ['./detailed-course.component.scss'],
    standalone: true,
    imports: [CommentComponent, LearningFilterComponent]
})
export class DetailedCourseComponent {

  public commentsData = commentsData;

}
