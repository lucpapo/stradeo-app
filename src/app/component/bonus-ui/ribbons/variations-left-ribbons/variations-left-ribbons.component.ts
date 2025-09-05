import { Component } from '@angular/core';
import { LeftRibbons } from '../../../../shared/data/data/bonus-ui/ribbons';

@Component({
    selector: 'app-variations-left-ribbons',
    templateUrl: './variations-left-ribbons.component.html',
    styleUrls: ['./variations-left-ribbons.component.scss'],
    standalone: true
})
export class VariationsLeftRibbonsComponent {

  public leftRibbonsData = LeftRibbons;

}
