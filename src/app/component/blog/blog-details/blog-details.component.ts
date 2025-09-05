import { Component } from '@angular/core';
import { BlogFilterComponent } from '../widgets/blog-filter/blog-filter.component';
import { FormsModule } from '@angular/forms';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss'],
    standalone: true,
    imports: [BlogCommentComponent, FormsModule, BlogFilterComponent]
})

export class BlogDetailsComponent {
  

}
