import { Component } from '@angular/core';
import { badgePartButtons } from '../../../../shared/data/data/ui-kits/tag-pills';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-badge-part-buttons',
    templateUrl: './badge-part-buttons.component.html',
    styleUrls: ['./badge-part-buttons.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})

export class BadgePartButtonsComponent {

  public buttonsPartData = badgePartButtons;

}
