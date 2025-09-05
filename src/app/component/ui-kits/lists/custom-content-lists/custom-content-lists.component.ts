import { Component } from '@angular/core';
import { customContentLists } from '../../../../shared/data/data/ui-kits/lists';

@Component({
    selector: 'app-custom-content-lists',
    templateUrl: './custom-content-lists.component.html',
    styleUrls: ['./custom-content-lists.component.scss'],
    standalone: true
})
export class CustomContentListsComponent {

  public customContentData = customContentLists;

}
