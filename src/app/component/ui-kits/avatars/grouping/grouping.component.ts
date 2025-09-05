import { Component } from '@angular/core';
import { grouping } from '../../../../shared/data/data/ui-kits/avavtar';

@Component({
    selector: 'app-grouping',
    templateUrl: './grouping.component.html',
    styleUrls: ['./grouping.component.scss'],
    standalone: true
})
export class GroupingComponent {

  public groupingData = grouping;

}
