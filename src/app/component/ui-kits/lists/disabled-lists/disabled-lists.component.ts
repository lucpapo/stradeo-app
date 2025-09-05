import { Component } from '@angular/core';
import { disabledLists } from '../../../../shared/data/data/ui-kits/lists';

@Component({
    selector: 'app-disabled-lists',
    templateUrl: './disabled-lists.component.html',
    styleUrls: ['./disabled-lists.component.scss'],
    standalone: true
})
export class DisabledListsComponent {

  public disableData = disabledLists;

}
