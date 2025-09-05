import { Component } from '@angular/core';
import { commonBorderPositionCardData } from '../../../../shared/data/data/bonus-ui/creative-cards';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-common-border-card',
    templateUrl: './common-border-card.component.html',
    styleUrls: ['./common-border-card.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class CommonBorderCardComponent {

  public Data = commonBorderPositionCardData;

}
