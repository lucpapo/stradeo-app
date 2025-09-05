import { Component } from '@angular/core';
import { primaryBackground } from '../../../../../shared/data/data/table/bootstrap-table/basic-tables';

@Component({
    selector: 'app-inverse-table-primary-background',
    templateUrl: './inverse-table-primary-background.component.html',
    styleUrls: ['./inverse-table-primary-background.component.scss'],
    standalone: true
})
export class InverseTablePrimaryBackgroundComponent {

  public primaryData = primaryBackground;

}
