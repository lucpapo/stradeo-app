import { Component } from '@angular/core';
import { CommonSvgIconsComponent } from "../common-svg-icons/common-svg-icons.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonSvgIconsComponent,RouterModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})

export class NotificationsComponent {
  
  public isNotification: boolean = false;

}
