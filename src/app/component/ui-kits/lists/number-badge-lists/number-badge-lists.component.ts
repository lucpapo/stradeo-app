import { Component } from '@angular/core';
import { numberedBadgeLists } from '../../../../shared/data/data/ui-kits/lists';

@Component({
    selector: 'app-number-badge-lists',
    templateUrl: './number-badge-lists.component.html',
    styleUrls: ['./number-badge-lists.component.scss'],
    standalone: true
})
export class NumberBadgeListsComponent {

  public NumberedBadgeData = numberedBadgeLists;

}
