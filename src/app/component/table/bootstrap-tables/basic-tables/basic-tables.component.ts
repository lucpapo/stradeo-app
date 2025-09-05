import { Component } from '@angular/core';
import { DashedBorderComponent } from './dashed-border/dashed-border.component';
import { CustomTableColorHoverStrippedComponent } from './custom-table-color-hover-stripped/custom-table-color-hover-stripped.component';
import { SizingTablesComponent } from './sizing-tables/sizing-tables.component';
import { ResponsiveTablesLightBackgroundComponent } from './responsive-tables-light-background/responsive-tables-light-background.component';
import { BreakpointSpecificComponent } from './break-point-specific/break-point-specific.component';
import { StripedRowInverseTableComponent } from './striped-row-inverse-table/striped-row-inverse-table.component';
import { tableHeadOptionsComponent } from './table-head-options/table-head-options.component';
import { CaptionComponent } from './caption/caption.component';
import { InverseTablePrimaryBackgroundComponent } from './inverse-table-primary-background/inverse-table-primary-background.component';
import { HoverAbleRowsHorizontalBorderComponent } from './hover-able-rows-horizontal-border/hover-able-rows-horizontal-border.component';
import { InverseTableComponent } from './inverse-table/inverse-table.component';
import { BorderBottomColorComponent } from './border-bottom-color/border-bottom-color.component';

@Component({
    selector: 'app-basic-tables',
    templateUrl: './basic-tables.component.html',
    styleUrls: ['./basic-tables.component.scss'],
    standalone: true,
    imports: [BorderBottomColorComponent, InverseTableComponent, 
        HoverAbleRowsHorizontalBorderComponent, InverseTablePrimaryBackgroundComponent, 
        CaptionComponent, tableHeadOptionsComponent, StripedRowInverseTableComponent, 
        BreakpointSpecificComponent, ResponsiveTablesLightBackgroundComponent, 
        SizingTablesComponent, CustomTableColorHoverStrippedComponent, DashedBorderComponent]
})

export class BasicTablesComponent {

}
