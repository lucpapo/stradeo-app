import { Component } from '@angular/core';
import { hoverBleData } from '../../../../../shared/data/data/table/bootstrap-table/basic-tables';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-hover-able-rows-horizontal-border',
    templateUrl: './hover-able-rows-horizontal-border.component.html',
    styleUrls: ['./hover-able-rows-horizontal-border.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class HoverAbleRowsHorizontalBorderComponent {

  public hoverAble = hoverBleData;

}
