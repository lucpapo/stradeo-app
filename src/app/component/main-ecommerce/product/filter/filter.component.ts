import { Component } from '@angular/core';
import { filterData } from '../../../../shared/data/data/main-ecommerce/product';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { brandCheckbox, categoryCheckbox } from '../../../../shared/data/data/main-ecommerce/product';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { Options, NgxSliderModule } from '@angular-slider/ngx-slider';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    standalone: true,
    imports: [NgxSliderModule, CarouselModule]
})

export class FilterComponent {

  public filter = filterData;
  public CategoryCheckboxData = categoryCheckbox;
  public BrandCheckboxData = brandCheckbox;
  public openSidebar: boolean = false
  public value2: number = 200;
  public maxvalue: number = 800;

  constructor(public config: NgbRatingConfig) { config.max = 5; config.readonly = true; }

  customOptions: OwlOptions = {
    items: 1,
    margin: 30,
    loop: true,
    dots: false,
    nav: true,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
  }

  options: Options = {
    floor: 0,
    ceil: 1000,
    showTicksValues: true,
    tickStep : 250
  };
  
  sidebarToggle() {
    this.openSidebar = !this.openSidebar
  }

}
