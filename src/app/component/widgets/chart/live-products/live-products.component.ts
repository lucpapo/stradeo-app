import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-live-products',
    templateUrl: './live-products.component.html',
    styleUrls: ['./live-products.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class LiveProductsComponent {

  public LiveProduct = widgetChat.LiveProductsChart;

}
