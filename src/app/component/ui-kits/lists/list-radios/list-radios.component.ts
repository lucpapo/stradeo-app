import { Component } from '@angular/core';
import { listRadios } from '../../../../shared/data/data/ui-kits/lists';

@Component({
    selector: 'app-list-radios',
    templateUrl: './list-radios.component.html',
    styleUrls: ['./list-radios.component.scss'],
    standalone: true
})
export class ListRadiosComponent {

  public listRadiosData = listRadios;

}
