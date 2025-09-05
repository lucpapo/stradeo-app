import { Component } from '@angular/core';
import * as Data from '../../../shared/data/data/gallery/hover'
import { GallerizeDirective } from 'ng-gallery/lightbox';

@Component({
    selector: 'app-hover-effects',
    templateUrl: './hover-effects.component.html',
    styleUrls: ['./hover-effects.component.scss'],
    standalone: true,
    imports:[GallerizeDirective]
})

export class HoverEffectsComponent {

  public imgData = Data.imgData;
  public hoverData = Data.hoverData;

}
