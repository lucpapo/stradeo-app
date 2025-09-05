import { Component } from '@angular/core';
import { ratio } from '../../../../shared/data/data/ui-kits/avavtar';

@Component({
    selector: 'app-ratio',
    templateUrl: './ratio.component.html',
    styleUrls: ['./ratio.component.scss'],
    standalone: true
})
export class RatioComponent {

  public ratioData = ratio;

}
