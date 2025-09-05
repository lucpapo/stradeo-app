import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';

export default  [
  {
    path: '',
    component: ContactsComponent,
    data: {
      title: 'Contacts',
      breadcrumb: 'Contacts'
    }
  }
] as Routes; 


export class ContactsRoutingModule { }
