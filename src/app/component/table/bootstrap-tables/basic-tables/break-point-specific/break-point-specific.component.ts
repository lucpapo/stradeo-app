import { Component } from '@angular/core';
import { breakPointSpecific } from '../../../../../shared/data/data/table/bootstrap-table/basic-tables';

@Component({
    selector: 'app-break-point-specific',
    templateUrl: './break-point-specific.component.html',
    styleUrls: ['./break-point-specific.component.scss'],
    standalone: true
})
export class BreakpointSpecificComponent {

  public breakpointData = breakPointSpecific;

}
