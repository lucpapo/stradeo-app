import { Component, Input } from '@angular/core';
import { titleData } from '../../../../../shared/data/data/ui-kits/helper-classes';

@Component({
    selector: 'app-common-border-displays',
    templateUrl: './common-border-displays.component.html',
    styleUrls: ['./common-border-displays.component.scss'],
    standalone: true
})
export class CommonBorderDisplaysComponent {

  @Input() data: titleData[];

}
