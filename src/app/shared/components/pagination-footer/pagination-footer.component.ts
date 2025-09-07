import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagination-footer',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './pagination-footer.component.html',
  styleUrls: ['./pagination-footer.component.scss']
})
export class PaginationFooterComponent {
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() total: number = 0;
  @Input() showingRange: string = '';
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  onPageSizeChange(pageSizeValue: string): void {
    const pageSize = parseInt(pageSizeValue, 10);
    this.pageSizeChange.emit(pageSize);
  }
}