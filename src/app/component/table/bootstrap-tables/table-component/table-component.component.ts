import { Component } from '@angular/core';
import { SwitchTableComponent } from './switch-table/switch-table.component';
import { TooltipTriggersComponent } from './tooltip-triggers/tooltip-triggers.component';
import { BadgesComponent } from './badges/badges.component';
import { InputComponent } from './input/input.component';
import { SelectTableComponent } from './select-table/select-table.component';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { CheckboxTableComponent } from './checkbox-table/checkbox-table.component';
import { ProgressBarTableComponent } from './progress-bar-table/progress-bar-table.component';
import { AlertsTableComponent } from './alerts-table/alerts-table.component';
import { UiTableComponent } from './ui-table/ui-table.component';

@Component({
    selector: 'app-table-component',
    templateUrl: './table-component.component.html',
    styleUrls: ['./table-component.component.scss'],
    standalone: true,
    imports: [UiTableComponent, AlertsTableComponent, ProgressBarTableComponent, 
        CheckboxTableComponent, RadioButtonsComponent, SelectTableComponent, 
        InputComponent, BadgesComponent, TooltipTriggersComponent, SwitchTableComponent]
})
export class TableComponentComponent {

}
