import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-total-product',
    templateUrl: './total-product.component.html',
    styleUrls: ['./total-product.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class TotalProductComponent {

  public TotalPorductChart = widgetChat.TotalProduct

}
