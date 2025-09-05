import { Routes } from '@angular/router';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';

export default [
  {
    path: 'private-chat',
    component: PrivateChatComponent,
    data: {
      title: "Private chat",
      breadcrumb: "Private chat",
    }
  },
  {
    path: 'group-chat',
    component: GroupChatComponent,
    data: {
      title: "Group-chat",
      breadcrumb: "Group-Chat",
    }
  }
] as Routes;

