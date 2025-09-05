import { Component } from '@angular/core';
import * as widgetChat from '../../../../shared/data/chart/widgets';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-crypto-annotations',
    templateUrl: './crypto-annotations.component.html',
    styleUrls: ['./crypto-annotations.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule]
})
export class CryptoAnnotationsComponent {

  public CryptoAnnotationsChart = widgetChat.CryptoAnnotationsChart;

}
