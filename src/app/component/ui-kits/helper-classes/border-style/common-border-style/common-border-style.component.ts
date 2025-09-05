import { Component, Input } from '@angular/core';
import { titleData } from '../../../../../shared/data/data/ui-kits/helper-classes';

@Component({
    selector: 'app-common-border-style',
    templateUrl: './common-border-style.component.html',
    styleUrls: ['./common-border-style.component.scss'],
    standalone: true
})
export class CommonBorderStyleComponent {

  @Input() data: titleData[];

}
