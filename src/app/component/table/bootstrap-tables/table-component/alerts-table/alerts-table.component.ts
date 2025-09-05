import { Component } from '@angular/core';
import { AllAlertsTableComponent } from './all-alerts-table/all-alerts-table.component';

@Component({
    selector: 'app-alerts-table',
    templateUrl: './alerts-table.component.html',
    styleUrls: ['./alerts-table.component.scss'],
    standalone: true,
    imports: [AllAlertsTableComponent]
})
export class AlertsTableComponent {


}
