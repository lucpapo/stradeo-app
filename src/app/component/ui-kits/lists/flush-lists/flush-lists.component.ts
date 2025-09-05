import { Component } from '@angular/core';
import { flushLists } from '../../../../shared/data/data/ui-kits/lists';

@Component({
    selector: 'app-flush-lists',
    templateUrl: './flush-lists.component.html',
    styleUrls: ['./flush-lists.component.scss'],
    standalone: true
})

export class FlushListsComponent {

  public flushListData = flushLists;

}
