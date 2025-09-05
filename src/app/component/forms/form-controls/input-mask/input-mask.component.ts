import { Component } from '@angular/core';
import { DefaultInputMaskComponent } from './default-input-mask/default-input-mask.component';
import { TimeFormatComponent } from './time-format/time-format.component';
import { DateFormatComponent } from './date-format/date-format.component';

@Component({
    selector: 'app-input-mask',
    templateUrl: './input-mask.component.html',
    styleUrls: ['./input-mask.component.scss'],
    standalone: true,
    imports: [DateFormatComponent, TimeFormatComponent, DefaultInputMaskComponent]
})
export class InputMaskComponent {

}
