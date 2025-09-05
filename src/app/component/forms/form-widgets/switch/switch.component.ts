import { Component } from '@angular/core';
import { SwitchIconsComponent } from './switch-icons/switch-icons.component';
import { SwitchSizingComponent } from './switch-sizing/switch-sizing.component';
import { VariationSwitchesComponent } from './variation-switches/variation-switches.component';
import { DisabledOutlineSwitchComponent } from './disabled-outline-switch/disabled-outline-switch.component';
import { BordersWithIconsComponent } from './borders-with-icons/borders-with-icons.component';
import { UncheckedSwitchComponent } from './unchecked-switch/unchecked-switch.component';
import { IconsSwitchComponent } from './icons-switch/icons-switch.component';
import { CustomSwitchComponent } from './custom-switch/custom-switch.component';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
    standalone: true,
    imports: [CustomSwitchComponent, IconsSwitchComponent, UncheckedSwitchComponent, BordersWithIconsComponent, DisabledOutlineSwitchComponent, VariationSwitchesComponent, SwitchSizingComponent, SwitchIconsComponent]
})
export class SwitchComponent {

}
