import { Component } from '@angular/core';
import { UserChatComponent } from './user-chat/user-chat.component';
import { ContactsChatTabComponent } from './contacts-chat-tab/contacts-chat-tab.component';

@Component({
    selector: 'app-private-chat',
    templateUrl: './private-chat.component.html',
    styleUrls: ['./private-chat.component.scss'],
    standalone: true,
    imports: [ContactsChatTabComponent, UserChatComponent]
})
export class PrivateChatComponent {

}
