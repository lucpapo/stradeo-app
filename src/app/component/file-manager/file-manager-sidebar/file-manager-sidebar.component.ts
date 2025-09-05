import { Component } from '@angular/core';
import { ClickOutsideDirective } from '../../../shared/directive/outside.directive';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-file-manager-sidebar',
    templateUrl: './file-manager-sidebar.component.html',
    styleUrls: ['./file-manager-sidebar.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, FeatherIconComponent]
})

export class FileManagerSidebarComponent {
  
  public open: boolean = false;

  openFilter() {
    this.open = !this.open
  }

  clickOutside():void { 
    this.open = false;
  }
}


