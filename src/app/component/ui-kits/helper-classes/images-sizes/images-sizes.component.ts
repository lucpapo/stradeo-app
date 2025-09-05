import { Component } from '@angular/core';
import { imageSize } from '../../../../shared/data/data/ui-kits/helper-classes';

@Component({
    selector: 'app-images-sizes',
    templateUrl: './images-sizes.component.html',
    styleUrls: ['./images-sizes.component.scss'],
    standalone: true
})
export class ImagesSizesComponent {

  public ImagSizeData = imageSize;

}
