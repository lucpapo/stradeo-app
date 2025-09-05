import { Component } from '@angular/core';
import { RaiseInputStyleComponent } from './raise-input-style/raise-input-style.component';
import { EdgesInputStyleComponent } from './edges-input-style/edges-input-style.component';
import { BasicFloatingInputControlComponent } from './basic-floating-input-control/basic-floating-input-control.component';
import { BasicHtmlInputControlComponent } from './basic-html-input-control/basic-html-input-control.component';
import { FlatInputStyleComponent } from './flat-input-style/flat-input-style.component';
import { FileInputComponent } from './file-input/file-input.component';
import { FormControlSizingComponent } from './form-control-sizing/form-control-sizing.component';
import { SelectSizingComponent } from './select-sizing/select-sizing.component';
import { FloatingFormComponent } from './floating-form/floating-form.component';
import { BasicFormComponent } from './basic-form/basic-form.component';

@Component({
    selector: 'app-base-inputs',
    templateUrl: './base-inputs.component.html',
    styleUrls: ['./base-inputs.component.scss'],
    standalone: true,
    imports: [BasicFormComponent, FloatingFormComponent, SelectSizingComponent, 
        FormControlSizingComponent, FileInputComponent, FlatInputStyleComponent, 
        BasicHtmlInputControlComponent, BasicFloatingInputControlComponent, 
        EdgesInputStyleComponent, RaiseInputStyleComponent]
})
export class BaseInputsComponent {

}
