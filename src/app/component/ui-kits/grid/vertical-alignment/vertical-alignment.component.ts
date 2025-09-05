import { Component } from '@angular/core';
import { VerticalAlignment } from '../../../../shared/data/data/ui-kits/grid-options';

@Component({
    selector: 'app-vertical-alignment',
    templateUrl: './vertical-alignment.component.html',
    styleUrls: ['./vertical-alignment.component.scss'],
    standalone: true
})
export class VerticalAlignmentComponent {

  public VerticalAlignmentData = VerticalAlignment;

}
