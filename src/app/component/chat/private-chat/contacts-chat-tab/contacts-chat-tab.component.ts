import { Component } from '@angular/core';
import { chats, contacts } from '../../../../shared/data/data/chat';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";

@Component({
    selector: 'app-contacts-chat-tab',
    templateUrl: './contacts-chat-tab.component.html',
    styleUrls: ['./contacts-chat-tab.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent, NgbNavModule, CommonSvgIconsComponent]
})
export class ContactsChatTabComponent {

  public active = 1;
  public privateData = chats;
  public contactsData = contacts;
  public openid: number;
  public isOpen: boolean = false;

  openMenu(id: number) {
    this.contactsData.filter(da => {
      if (da.id == id) {
        this.openid = id;
        this.isOpen = !this.isOpen
      }
    })
  }
}

   


