import { Component } from '@angular/core';
import { defaultLists } from '../../../../shared/data/data/ui-kits/lists';

@Component({
    selector: 'app-default-lists',
    templateUrl: './default-lists.component.html',
    styleUrls: ['./default-lists.component.scss'],
    standalone: true
})
export class DefaultListsComponent {

  public defaultListData = defaultLists;

}
