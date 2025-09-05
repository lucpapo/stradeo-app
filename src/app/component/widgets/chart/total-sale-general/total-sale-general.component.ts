import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TotalSale } from '../../../../shared/data/chart/widgets';

@Component({
    selector: 'app-total-sale-general',
    templateUrl: './total-sale-general.component.html',
    styleUrls: ['./total-sale-general.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class TotalSaleGeneralComponent {

  public TotalSaleChart = TotalSale;

}
