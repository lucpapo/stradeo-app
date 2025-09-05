import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";

@Component({
    selector: 'app-widget-sales-overview',
    templateUrl: './widget-sales-overview.component.html',
    styleUrls: ['./widget-sales-overview.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule, DropdownComponent]
})
export class WidgetSalesOverviewComponent {

  public SaleOverViewChart = widgetChat.SaleOverview;
  public isOpen: boolean = false;
  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];

  openMenu() {
    this.isOpen = !this.isOpen;
  }

}
