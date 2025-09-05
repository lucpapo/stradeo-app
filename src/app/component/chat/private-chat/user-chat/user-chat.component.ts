import { Component } from '@angular/core';
import { ClickOutsideDirective } from '../../../../shared/directive/outside.directive';
import { massage } from '../../../../shared/data/data/chat';
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";

@Component({
    selector: 'app-user-chat',
    templateUrl: './user-chat.component.html',
    styleUrls: ['./user-chat.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, CommonSvgIconsComponent]
})

export class UserChatComponent {

  public msgData = massage;
  public isOpen: boolean = false;
  public isShow: boolean = false;

  openMenu() {
    this.isOpen = !this.isOpen;
  }
  
  clickOutside():void { 
    this.isOpen = false;
  }

}
