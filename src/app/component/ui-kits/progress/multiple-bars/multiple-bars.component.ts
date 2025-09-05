import { Component } from '@angular/core';
import { multipleBar } from '../../../../shared/data/data/ui-kits/progress';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-multiple-bars',
    templateUrl: './multiple-bars.component.html',
    styleUrls: ['./multiple-bars.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class MultipleBarsComponent {

  public multiPalBarData = multipleBar;

}
