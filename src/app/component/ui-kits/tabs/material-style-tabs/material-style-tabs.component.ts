import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { descriptionData, reviewData, userDetailsData } from '../../../../shared/data/data/ui-kits/tab';

@Component({
    selector: 'app-material-style-tabs',
    templateUrl: './material-style-tabs.component.html',
    styleUrls: ['./material-style-tabs.component.scss'],
    standalone: true,
    imports: [NgbNavModule]
})
export class MaterialStyleTabsComponent {

  public active = 1;
  public userDetailsData = userDetailsData;
  public descriptionData = descriptionData;
  public reviewData = reviewData;


}
