import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-ui-table',
    templateUrl: './ui-table.component.html',
    styleUrls: ['./ui-table.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})
export class UiTableComponent {

}
