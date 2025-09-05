import { Component } from '@angular/core';
import { commonInfoColorCardData } from '../../../../shared/data/data/bonus-ui/basic-card';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-common-info-card',
    templateUrl: './common-info-card.component.html',
    styleUrls: ['./common-info-card.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class CommonInfoCardComponent {

  public basicData = commonInfoColorCardData;

}
