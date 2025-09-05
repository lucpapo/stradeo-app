import { Component } from '@angular/core';
import { navigationData1, navigationData2 } from '../../../shared/data/data/faq';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class NavigationComponent {

  public navigationData1 = navigationData1;
  public navigationData2 = navigationData2;

}
