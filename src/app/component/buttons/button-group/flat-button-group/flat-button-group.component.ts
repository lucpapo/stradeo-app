import { Component } from '@angular/core';
import { FlatButtonGroup } from '../../../../shared/data/data/buttons/button-group';

@Component({
    selector: 'app-flat-button-group',
    templateUrl: './flat-button-group.component.html',
    styleUrls: ['./flat-button-group.component.scss'],
    standalone: true
})
export class FlatButtonGroupComponent {

  public FlatGroupData = FlatButtonGroup;

}
