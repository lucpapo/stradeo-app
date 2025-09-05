import { Routes } from '@angular/router';
import { SearchResultComponent } from './search-result.component';

export default  [
  {
    path: '',
    component: SearchResultComponent,
    data: {
      title: 'Search Website',
      breadcrumb: 'Search Website'
    }
  }
] as Routes; 
