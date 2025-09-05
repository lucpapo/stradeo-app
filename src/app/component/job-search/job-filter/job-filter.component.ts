import { Component } from '@angular/core';
import * as Data from '../../../shared/data/data/job-search';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';
import { ClickOutsideDirective } from '../../../shared/directive/outside.directive';

@Component({
    selector: 'app-job-filter',
    templateUrl: './job-filter.component.html',
    styleUrls: ['./job-filter.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, NgbCollapse, FeatherIconComponent]
})

export class JobFilterComponent {

  public filterData = Data.filterData;
  public filterCheckBox = Data.filterCheckBox;
  public isCollapsed = false;
  public isCollapsed2 = false;
  public isCollapsed3 = false;
  public isCollapsed4 = false;
  public OpenFilter: boolean = false

  constructor() {  }


  Outside(){
    this.OpenFilter = false;
  }
  
}
