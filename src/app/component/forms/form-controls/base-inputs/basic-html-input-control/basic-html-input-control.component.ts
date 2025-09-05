import { Component } from '@angular/core';
import { DatalistComponent } from './datalist/datalist.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-basic-html-input-control',
    templateUrl: './basic-html-input-control.component.html',
    styleUrls: ['./basic-html-input-control.component.scss'],
    standalone: true,
    imports: [FormsModule, DateTimeComponent, DatalistComponent]
})
export class BasicHtmlInputControlComponent {

}
