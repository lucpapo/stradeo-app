import { Routes } from '@angular/router';
import { MainBookmarkComponent } from './main-bookmark.component';

export default  [
  {
    path: '',
    component: MainBookmarkComponent,
    data: {
      title: 'Bookmarks',
      breadcrumb: 'Bookmarks'
    }
  }
] as Routes; 
