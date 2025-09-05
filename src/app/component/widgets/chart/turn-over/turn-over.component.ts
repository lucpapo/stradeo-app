import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-turn-over',
    templateUrl: './turn-over.component.html',
    styleUrls: ['./turn-over.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class TurnOverComponent {

  public turnoverData = widgetChat.TurnOverChart;

}
