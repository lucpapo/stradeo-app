import { Component, Input } from '@angular/core';
import { titleData } from '../../../../../shared/data/data/ui-kits/helper-classes';

@Component({
    selector: 'app-common-background',
    templateUrl: './common-background.component.html',
    styleUrls: ['./common-background.component.scss'],
    standalone: true
})
export class CommonBackgroundComponent {

  @Input() data: titleData[];

}
