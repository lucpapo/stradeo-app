import { Component } from '@angular/core';
import { massage } from '../../../../shared/data/data/chat';
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";

@Component({
    selector: 'app-user-group-chat',
    templateUrl: './user-group-chat.component.html',
    styleUrls: ['./user-group-chat.component.scss'],
    standalone: true,
    imports: [CommonSvgIconsComponent]
})
export class UserGroupChatComponent {

  public MsgData = massage;
  public isOpen: boolean = false;

  openMenu() {
    this.isOpen = !this.isOpen;
  }

}
