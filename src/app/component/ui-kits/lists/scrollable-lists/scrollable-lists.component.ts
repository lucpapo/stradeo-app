import { Component } from '@angular/core';
import { scrollableLists } from '../../../../shared/data/data/ui-kits/lists';

@Component({
    selector: 'app-scrollable-lists',
    templateUrl: './scrollable-lists.component.html',
    styleUrls: ['./scrollable-lists.component.scss'],
    standalone: true
})

export class ScrollableListsComponent {

  public scrollableData = scrollableLists;

}
