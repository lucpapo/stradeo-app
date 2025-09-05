import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { orderHistory } from '../../../../shared/data/data/main-ecommerce/orders';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';
import { OrderDataTableDirective, SortEvent } from '../../../../shared/directive/order-data.directive';
import { ORDERS } from '../../../../shared/interface/odershistory';
import { OrderService } from '../../../../shared/service/main-ecommerce/order.service';

@Component({
  selector: 'app-data-table-order-history',
  templateUrl: './data-table-order-history.component.html',
  styleUrls: ['./data-table-order-history.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    OrderDataTableDirective,
    CommonModule,
    RouterLink,
    FeatherIconComponent,
    NgbPagination,
    AsyncPipe,
  ],
  providers: [OrderService,DecimalPipe],
})
export class DataTableOrderHistoryComponent {

  public products$: Observable<ORDERS[]>;
  public total$: Observable<number>;
  public Data: ORDERS[];
  public orderHistoryData = orderHistory;

  @ViewChildren(OrderDataTableDirective) headers: QueryList<OrderDataTableDirective>;

  constructor(public service: OrderService) {
    this.products$ = service.support$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.products$.subscribe((res) => {
      this.Data = res;
    });
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortableOrder !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
