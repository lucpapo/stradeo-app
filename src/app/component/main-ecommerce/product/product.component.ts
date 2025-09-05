import { Component } from '@angular/core';
import { ProductBoxComponent } from './product-box/product-box.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';
import { ClickOutsideDirective } from '../../../shared/directive/outside.directive';
import { ProductBoxFilterService } from '../../../shared/service/main-ecommerce/product-box-filter.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, FeatherIconComponent, FormsModule, FilterComponent, ProductBoxComponent]
})
export class ProductComponent {

  public listView: boolean = false;
  public openSidebar: boolean = false;
  public OpenFilter: boolean = false;

  constructor(private ProductBoxFilterService: ProductBoxFilterService) { }

  gridOpens() {
    this.listView = false
    this.ProductBoxFilterService.gridOpen()
  }
  
  listOpens() {
    this.listView = true
    this.ProductBoxFilterService.listOpen()
  }

  grid2s() {
    this.listView = false
    this.ProductBoxFilterService.grid2()
  }

  grid3s() {
    this.listView = false
    this.ProductBoxFilterService.grid3()
  }

  grid6s() {
    this.listView = false
    this.ProductBoxFilterService.grid6()
  }

  sidebarToggle() {
    this.openSidebar = !this.openSidebar
  }
  openFilter() {
    this.openSidebar = !this.openSidebar
  }

  clickOutside():void { 
    this.openSidebar =false
  }

}
