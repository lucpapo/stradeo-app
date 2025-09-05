import { Component, Input } from '@angular/core';
import * as data from "../../../../../../shared/data/data/all-contact";

@Component({
    selector: 'app-address-content',
    templateUrl: './address-content.component.html',
    styleUrls: ['./address-content.component.scss'],
    standalone: true
})
export class AddressContentComponent {

  public editContact: boolean = true;
  @Input() lastData: data.lastDataList;

}
