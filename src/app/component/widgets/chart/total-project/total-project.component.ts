import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-total-project',
    templateUrl: './total-project.component.html',
    styleUrls: ['./total-project.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class TotalProjectComponent {

  public TotalProjectChart = widgetChat.TotalProject

}
