import { Component } from '@angular/core';
import { UserGroupChatComponent } from './user-group-chat/user-group-chat.component';
import { ContactsChatTabComponent } from '../private-chat/contacts-chat-tab/contacts-chat-tab.component';

@Component({
    selector: 'app-group-chat',
    templateUrl: './group-chat.component.html',
    styleUrls: ['./group-chat.component.scss'],
    standalone: true,
    imports: [ContactsChatTabComponent, UserGroupChatComponent]
})
export class GroupChatComponent {

}
