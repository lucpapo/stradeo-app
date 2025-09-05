import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import * as Data from '../../../../shared/data/data/ui-kits/dropdown';

@Component({
    selector: 'app-helper-card',
    templateUrl: './helper-card.component.html',
    styleUrls: ['./helper-card.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})

export class HelperCardComponent {

  public helperCardData = Data.helperCard;

}
