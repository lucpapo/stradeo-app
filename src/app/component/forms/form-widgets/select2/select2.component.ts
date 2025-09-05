import { Component } from '@angular/core';
import { FullColoredVariantComponent } from './full-colored-variant/full-colored-variant.component';
import { OutlineColorVariantComponent } from './outline-color-variant/outline-color-variant.component';
import { DefaultSelectComponent } from './default-select/default-select.component';

@Component({
    selector: 'app-select2',
    templateUrl: './select2.component.html',
    styleUrls: ['./select2.component.scss'],
    standalone: true,
    imports: [DefaultSelectComponent, OutlineColorVariantComponent, FullColoredVariantComponent]
})
export class Select2Component {

}
