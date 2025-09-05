import { Component } from '@angular/core';
import * as Data from '../../../shared/data/data/social-media-data';
import { GallerizeDirective } from 'ng-gallery/lightbox';

@Component({
    selector: 'app-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.scss'],
    standalone: true,
    imports: [GallerizeDirective]
})

export class PhotosComponent {

  public photosData = Data.photosData;

}
