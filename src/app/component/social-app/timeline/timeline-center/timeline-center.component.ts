import { Component } from '@angular/core';
import { CommentTwoComponent } from './comment-two/comment-two.component';
import { CommentOneComponent } from './comment-one/comment-one.component';

@Component({
    selector: 'app-timeline-center',
    templateUrl: './timeline-center.component.html',
    styleUrls: ['./timeline-center.component.scss'],
    standalone: true,
    imports: [CommentOneComponent, CommentTwoComponent]
})
export class TimelineCenterComponent {

}
