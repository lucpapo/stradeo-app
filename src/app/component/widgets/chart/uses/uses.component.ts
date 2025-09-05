import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-uses',
    templateUrl: './uses.component.html',
    styleUrls: ['./uses.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class UsesComponent {

  public Uses = widgetChat.UsesChart;

}
