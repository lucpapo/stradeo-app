import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Table } from '../../../shared/data/data/table/data-table/SupportTdb';
import { BasicDataTableDirective, SortEvent } from '../../../shared/directive/basic-data-table.directive';
import { basicDataTableService } from '../../../shared/service/basicdatatable.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    BasicDataTableDirective,
    NgbPagination,
    AsyncPipe,
  ],
  providers: [basicDataTableService,DecimalPipe],
})
export class DataTableComponent {

  public isShow: boolean = false;
  public basicDataTable$: Observable<Table[]>;
  public total$: Observable<number>;
  public basicData: Table[];
  @ViewChildren(BasicDataTableDirective)
  public headers: QueryList<BasicDataTableDirective>;

  constructor(public service: basicDataTableService) {
    this.basicDataTable$ = service.basicDataTable$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.service.basicDataTable$.subscribe((data) => {
      if (data) {
        this.basicData = data;
      }
    });
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  removeItem(id: number) {
    this.basicDataTable$.subscribe((data: Table[]) => {
      data.map((elem: Table, i: number) => { elem.id == id && data.splice(i, 1) })
    })
  }
}
