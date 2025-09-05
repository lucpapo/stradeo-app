import { Component } from '@angular/core';
import * as Data from '../../../shared/data/data/social-media-data';
import { GallerizeDirective } from 'ng-gallery/lightbox';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
    standalone: true,
    imports: [GallerizeDirective]
})
export class ImagesComponent {

  public photosData = Data.photosData;

}
