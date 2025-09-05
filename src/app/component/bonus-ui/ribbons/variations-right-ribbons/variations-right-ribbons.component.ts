import { Component } from '@angular/core';
import { RightRibbons } from '../../../../shared/data/data/bonus-ui/ribbons';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-variations-right-ribbons',
    templateUrl: './variations-right-ribbons.component.html',
    styleUrls: ['./variations-right-ribbons.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class VariationsRightRibbonsComponent {

  public rightRibbonsData = RightRibbons;

}
