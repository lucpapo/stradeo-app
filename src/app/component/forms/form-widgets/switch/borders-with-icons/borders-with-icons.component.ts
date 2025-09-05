import { Component } from '@angular/core';
import { borderIcons } from '../../../../../shared/data/data/forms/forms-widgets/switch';

@Component({
    selector: 'app-borders-with-icons',
    templateUrl: './borders-with-icons.component.html',
    styleUrls: ['./borders-with-icons.component.scss'],
    standalone: true
})
export class BordersWithIconsComponent {

  public borderData = borderIcons;

}
