import { Component } from '@angular/core';
import { horizontalLists } from '../../../../shared/data/data/ui-kits/lists';

@Component({
    selector: 'app-horizontal-lists',
    templateUrl: './horizontal-lists.component.html',
    styleUrls: ['./horizontal-lists.component.scss'],
    standalone: true
})
export class HorizontalListsComponent {

  public horizontalData = horizontalLists;

}
