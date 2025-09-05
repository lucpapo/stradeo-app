import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-order-status',
    templateUrl: './order-status.component.html',
    styleUrls: ['./order-status.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class OrderStatusComponent {

  public OrderStatusChart = widgetChat.OrderStatusChart;

}
