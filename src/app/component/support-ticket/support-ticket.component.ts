import { Component } from '@angular/core';
import { SupportTicketDataTableComponent } from './support-ticket-data-table/support-ticket-data-table.component';
import { SupportTicketListComponent } from './support-ticket-list/support-ticket-list.component';

@Component({
    selector: 'app-support-ticket',
    templateUrl: './support-ticket.component.html',
    styleUrls: ['./support-ticket.component.scss'],
    standalone: true,
    imports: [SupportTicketListComponent, SupportTicketDataTableComponent]
})
export class SupportTicketComponent {

}
