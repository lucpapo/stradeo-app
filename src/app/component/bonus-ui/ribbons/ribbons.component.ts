import { Component } from '@angular/core';
import { VariationsRightRibbonsComponent } from './variations-right-ribbons/variations-right-ribbons.component';
import { VariationsLeftRibbonsComponent } from './variations-left-ribbons/variations-left-ribbons.component';

@Component({
    selector: 'app-ribbons',
    templateUrl: './ribbons.component.html',
    styleUrls: ['./ribbons.component.scss'],
    standalone: true,
    imports: [VariationsLeftRibbonsComponent, VariationsRightRibbonsComponent]
})
export class RibbonsComponent {

}
