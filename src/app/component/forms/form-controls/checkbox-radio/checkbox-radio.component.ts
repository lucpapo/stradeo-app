import { Component } from '@angular/core';
import { OutlinedCheckboxStylesComponent } from './outlined-checkbox-styles/outlined-checkbox-styles.component';
import { RadioToggleButtonsComponent } from './radio-toggle-buttons/radio-toggle-buttons.component';
import { BasicRadioCheckboxComponent } from './basic-radio-checkbox/basic-radio-checkbox.component';
import { AnimatedButtonsComponent } from './animated-buttons/animated-buttons.component';
import { InlineInputTypesComponent } from './inline-input-types/inline-input-types.component';
import { DefaultSwitchesComponent } from './default-switches/default-switches.component';
import { CustomRadioComponent } from './custom-radio/custom-radio.component';
import { ImagesRadioComponent } from './images-radio/images-radio.component';
import { ImagesCheckboxComponent } from './images-checkbox/images-checkbox.component';
import { DefaultRadioComponent } from './default-radio/default-radio.component';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { DefaultCheckboxComponent } from './default-checkbox/default-checkbox.component';

@Component({
    selector: 'app-checkbox-radio',
    templateUrl: './checkbox-radio.component.html',
    styleUrls: ['./checkbox-radio.component.scss'],
    standalone: true,
    imports: [DefaultCheckboxComponent, CustomCheckboxComponent, DefaultRadioComponent, ImagesCheckboxComponent, ImagesRadioComponent, CustomRadioComponent, DefaultSwitchesComponent, InlineInputTypesComponent, AnimatedButtonsComponent, BasicRadioCheckboxComponent, RadioToggleButtonsComponent, OutlinedCheckboxStylesComponent]
})
export class CheckboxRadioComponent {

}
