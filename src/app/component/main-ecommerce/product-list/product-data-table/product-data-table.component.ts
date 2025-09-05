import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbRatingConfig, NgbRating, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { productListData, productListInterface } from '../../../../shared/data/data/main-ecommerce/product-list';

import { RouterLink } from '@angular/router';
import { CommonModule, AsyncPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListDirective, SortEvent } from '../../../../shared/directive/product-list.directive';
import { ProductListService } from '../../../../shared/service/main-ecommerce/product-list.service';


@Component({
    selector: 'app-product-data-table',
    templateUrl: './product-data-table.component.html',
    styleUrls: ['./product-data-table.component.scss'],
    providers: [ProductListService,DecimalPipe],
    standalone: true,
    imports: [FormsModule, ProductListDirective, CommonModule, NgbRating, RouterLink, NgbPagination, AsyncPipe],
})
export class ProductDataTableComponent {

  public products$: Observable<productListInterface[]>;
  public total$: Observable<number>;
  public  Data:productListInterface[];
  public PRODUCTLIST = productListData

  @ViewChildren(ProductListDirective)
  headers!: QueryList<ProductListDirective>;

  constructor(public service: ProductListService, public config: NgbRatingConfig) {
    config.max = 5; config.readonly = true;
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
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
