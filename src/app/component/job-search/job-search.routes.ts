import { Routes } from '@angular/router';
import { ApplyComponent } from './apply/apply.component';
import { CardsViewComponent } from './cards-view/cards-view.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ListViewComponent } from './list-view/list-view.component';

export default [
  {
    path: 'cards-view',
    component: CardsViewComponent,
    data: {
      title: 'Cards View',
      breadcrumb: 'Cards View',
    }
  },
  {
    path: 'list-view',
    component: ListViewComponent,
    data: {
      title: 'List View',
      breadcrumb: 'List View',
    }
  },
  {
    path: 'job-details',
    component: JobDetailsComponent,
    data: {
      title: 'Job Details',
      breadcrumb: 'Job Details',
    }
  },
  {
    path: 'apply',
    component: ApplyComponent,
    data: {
      title: 'Apply',
      breadcrumb: 'Apply',
    }
  },
] as Routes;
