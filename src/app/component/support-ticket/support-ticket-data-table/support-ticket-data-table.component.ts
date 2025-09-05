import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { supportDB } from '../../../shared/data/data/support-ticket';
import { TranslateModule } from '@ngx-translate/core';
import { NgbdSortableHeader2, SortEvent } from '../../../shared/directive/support-ticket.directive';
import { SupportTicketService } from '../../../shared/service/support-ticket.service';

@Component({
  selector: 'app-support-ticket-data-table',
  templateUrl: './support-ticket-data-table.component.html',
  styleUrls: ['./support-ticket-data-table.component.scss'],
  standalone: true,
  imports: [FormsModule, NgbdSortableHeader2, CommonModule, NgbPagination, AsyncPipe],
  providers: [SupportTicketService, DecimalPipe,TranslateModule],
})

export class SupportTicketDataTableComponent {

  public countries$: Observable<supportDB[]>;
  public Data: supportDB[];
  public direction: string;
  public total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader2) headers: QueryList<NgbdSortableHeader2>;

  constructor(public service: SupportTicketService) {
    this.countries$ = service.support$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.countries$.subscribe((res) => {
      this.Data = res;
    });
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.direction = direction;
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
