import { Component } from '@angular/core';
import { listCheckbox } from '../../../../shared/data/data/ui-kits/lists';

@Component({
    selector: 'app-list-checkbox',
    templateUrl: './list-checkbox.component.html',
    styleUrls: ['./list-checkbox.component.scss'],
    standalone: true
})
export class ListCheckboxComponent {

  public listsCheckboxData = listCheckbox;

}
