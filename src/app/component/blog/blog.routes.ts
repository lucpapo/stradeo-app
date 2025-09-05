
import { Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogGridsComponent } from './blog-grids/blog-grids.component';

export default [
  {
    path: 'blog-grids',
    component: BlogGridsComponent,
    data: {
      title: 'Blog Grids',
      breadcrumb: 'Blog Grids'
    }
  },
  {
    path: 'blog-details',
    component: BlogDetailsComponent,
    data: {
      title: 'Blog Details',
      breadcrumb: 'Blog Details'
    }
  },
  {
    path: 'add-post',
    component: AddPostComponent,
    data: {
      title: 'Add Post',
      breadcrumb: 'Add Post'
    }
  },
] as Routes;


