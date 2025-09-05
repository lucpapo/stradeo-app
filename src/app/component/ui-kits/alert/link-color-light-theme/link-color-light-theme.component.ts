import { Component } from '@angular/core';
import { lightThemeAlert } from '../../../../shared/data/data/ui-kits/alert';

@Component({
    selector: 'app-link-color-light-theme',
    templateUrl: './link-color-light-theme.component.html',
    styleUrls: ['./link-color-light-theme.component.scss'],
    standalone: true
})
export class LinkColorLightThemeComponent {

  public lightThemeData = lightThemeAlert;

}
