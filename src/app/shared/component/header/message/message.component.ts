import { Component } from '@angular/core';
import { FeatherIconComponent } from "../feather-icon/feather-icon.component";
import { CommonSvgIconsComponent } from "../common-svg-icons/common-svg-icons.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FeatherIconComponent, CommonSvgIconsComponent,RouterModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})

export class MessageComponent {

  public isMessage: boolean = false;

}
