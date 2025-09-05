import { Component } from '@angular/core';
import { ticketListStatus } from '../../../shared/data/data/support-ticket';

@Component({
    selector: 'app-support-ticket-list', 
    templateUrl: './support-ticket-list.component.html',
    styleUrls: ['./support-ticket-list.component.scss'],
    standalone: true
})

export class SupportTicketListComponent {

  public ticketData = ticketListStatus;

}
