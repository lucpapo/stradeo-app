import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import * as data from '../../../../../shared/data/data/social-media-data';

@Component({
    selector: 'app-latest-photos',
    templateUrl: './latest-photos.component.html',
    styleUrls: ['./latest-photos.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule]
})
export class LatestPhotosComponent {

  public latestPhotosData = data.latestPhotos;

}
