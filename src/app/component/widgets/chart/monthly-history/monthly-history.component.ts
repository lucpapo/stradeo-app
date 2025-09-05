import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-monthly-history',
    templateUrl: './monthly-history.component.html',
    styleUrls: ['./monthly-history.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class MonthlyHistoryComponent {

  public MonthlyHistoryChart = widgetChat.MonthlyHistory;

}
