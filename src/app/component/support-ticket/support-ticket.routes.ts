import { Routes } from '@angular/router';
import { SupportTicketComponent } from './support-ticket.component';

export default  [
  {
    path: '',
    component: SupportTicketComponent,
    data: {
      title: 'Support Ticket',
      breadcrumb: 'Support Ticket'
    }
  }
] as Routes; 
