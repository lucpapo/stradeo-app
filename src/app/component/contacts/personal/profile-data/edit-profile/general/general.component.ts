import { Component, Input } from '@angular/core';
import * as data from "../../../../../../shared/data/data/all-contact";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class GeneralComponent {

  @Input() lastData: data.lastDataList;

}
