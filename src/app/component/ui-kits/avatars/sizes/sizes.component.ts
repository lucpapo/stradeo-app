import { Component } from '@angular/core';
import { avatarSize } from '../../../../shared/data/data/ui-kits/avavtar';

@Component({
    selector: 'app-sizes',
    templateUrl: './sizes.component.html',
    styleUrls: ['./sizes.component.scss'],
    standalone: true
})
export class SizesComponent {

  public SizeData = avatarSize;

}
