import { Component } from '@angular/core';
import { darkThemAlert } from '../../../../shared/data/data/ui-kits/alert';

@Component({
    selector: 'app-link-color-dark-theme',
    templateUrl: './link-color-dark-theme.component.html',
    styleUrls: ['./link-color-dark-theme.component.scss'],
    standalone: true
})
export class LinkColorDarkThemeComponent {

  public darkThemeData = darkThemAlert;

}
