import { Component } from '@angular/core';
import { VerticalComponent } from './vertical/vertical.component';
import { NestingComponent } from './nesting/nesting.component';
import { CheckboxButtonGroupComponent } from './checkbox-button-group/checkbox-button-group.component';
import { RadioButtonGroupComponent } from './radio-button-group/radio-button-group.component';
import { OutlineFlatButtonComponent } from './outline-flat-button/outline-flat-button.component';
import { OutlineEdgesButtonComponent } from './outline-edges-button/outline-edges-button.component';
import { OutlineButtonGroupComponent } from './outline-button-group/outline-button-group.component';
import { OutlineCustomButtonGroup2Component } from './outline-custom-button-group2/outline-custom-button-group2.component';
import { OutlineCustomButtonGroupComponent } from './outline-custom-button-group/outline-custom-button-group.component';
import { LargeEdgesButtonGroupComponent } from './large-edges-button-group/large-edges-button-group.component';
import { LargeButtonGroupComponent } from './large-button-group/large-button-group.component';
import { FlatButtonGroupComponent } from './flat-button-group/flat-button-group.component';
import { EdgeButtonGroupComponent } from './edge-button-group/edge-button-group.component';
import { BasicButtonGroupComponent } from './basic-button-group/basic-button-group.component';

@Component({
    selector: 'app-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss'],
    standalone: true,
    imports: [BasicButtonGroupComponent, EdgeButtonGroupComponent, FlatButtonGroupComponent, LargeButtonGroupComponent, LargeEdgesButtonGroupComponent, OutlineCustomButtonGroupComponent, OutlineCustomButtonGroup2Component, OutlineButtonGroupComponent, OutlineEdgesButtonComponent, OutlineFlatButtonComponent, RadioButtonGroupComponent, CheckboxButtonGroupComponent, NestingComponent, VerticalComponent]
})
export class ButtonGroupComponent {

}
