import { Component } from '@angular/core';
import { VariationOfAddonsComponent } from './variation-of-addons/variation-of-addons.component';
import { BasicInputGroupsComponent } from './basic-input-groups/basic-input-groups.component';
import { MultipleInputsComponent } from './multiple-inputs/multiple-inputs.component';
import { InputSizingComponent } from './input-sizing/input-sizing.component';
import { InputCheckboxesRadiosComponent } from './input-checkboxes-radios/input-checkboxes-radios.component';
import { SegmentedButtonsComponent } from './segmented-buttons/segmented-buttons.component';
import { ButtonsDropdownsComponent } from './buttons-dropdowns/buttons-dropdowns.component';
import { CustomFileInputComponent } from './custom-file-input/custom-file-input.component';
import { CustomFormsComponent } from './custom-forms/custom-forms.component';
import { ButtonAddonsComponent } from './button-addons/button-addons.component';

@Component({
    selector: 'app-input-groups',
    templateUrl: './input-groups.component.html',
    styleUrls: ['./input-groups.component.scss'],
    standalone: true,
    imports: [ButtonAddonsComponent, CustomFormsComponent, CustomFileInputComponent, ButtonsDropdownsComponent, SegmentedButtonsComponent, InputCheckboxesRadiosComponent, InputSizingComponent, MultipleInputsComponent, BasicInputGroupsComponent, VariationOfAddonsComponent]
})
export class InputGroupsComponent {

}
