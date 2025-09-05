import { Component } from '@angular/core';
import { activeLists } from '../../../../shared/data/data/ui-kits/lists';

@Component({
    selector: 'app-active-lists',
    templateUrl: './active-lists.component.html',
    styleUrls: ['./active-lists.component.scss'],
    standalone: true
})

export class ActiveListsComponent {

  public activeData = activeLists;

}
