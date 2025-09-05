import { Component } from '@angular/core';
import { ClickOutsideDirective } from '../../../../../shared/directive/outside.directive';

@Component({
    selector: 'app-buttons-dropdowns',
    templateUrl: './buttons-dropdowns.component.html',
    styleUrls: ['./buttons-dropdowns.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective]
})
export class ButtonsDropdownsComponent {

  public open: boolean = false;
  public open2: boolean = false;
  public open3: boolean = false;
  public open4: boolean = false;

  openMenu() {
    this.open = !this.open;
  }

  openMenu2() {
    this.open2 = !this.open2
  }

  openMenu3() {
    this.open3 = !this.open3
  }

  openMenu4() {
    this.open4 = !this.open4
  }

}
