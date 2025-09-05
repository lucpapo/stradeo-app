import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './data-table.component';

export default  [
  {
    path: '',
    component: DataTableComponent,
    data: {
      title: "Data Table",
      breadcrumb: "Data Table",
    }
  }
] as Routes; 


export class DataTableRoutingModule { }
