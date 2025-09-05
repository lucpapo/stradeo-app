import { Component } from '@angular/core';
import { dashedBorder } from '../../../../../shared/data/data/table/bootstrap-table/basic-tables';

@Component({
    selector: 'app-dashed-border',
    templateUrl: './dashed-border.component.html',
    styleUrls: ['./dashed-border.component.scss'],
    standalone: true
})
export class DashedBorderComponent {

  public dashboardData = dashedBorder;

}
