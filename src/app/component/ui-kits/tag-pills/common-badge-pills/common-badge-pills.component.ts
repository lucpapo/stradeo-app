import { Component, Input } from '@angular/core';
import { button } from '../../../../shared/data/data/ui-kits/tag-pills';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-common-badge-pills',
    templateUrl: './common-badge-pills.component.html',
    styleUrls: ['./common-badge-pills.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class CommonBadgePillsComponent {

  @Input() data: button[];

}
