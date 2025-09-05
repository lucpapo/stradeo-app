import { Routes } from '@angular/router';
import { BasicTablesComponent } from './basic-tables/basic-tables.component';
import { TableComponentComponent } from './table-component/table-component.component';

export default [
  {
    path: 'basic-table',
    component: BasicTablesComponent,
    data: {
      title: "Bootstrap Basic Tables",
      breadcrumb: "Bootstrap Basic Tables",
    }
  },
  {
    path: 'table-components',
    component: TableComponentComponent,
    data: {
      title: "Table Components",
      breadcrumb: "Table Components",
    }
  },
] as Routes; 
