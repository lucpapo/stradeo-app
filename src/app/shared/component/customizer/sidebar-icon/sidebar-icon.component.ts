import { Component } from '@angular/core';
import { LayoutService } from '../../../service/layout.service';

@Component({
  selector: 'app-sidebar-icon',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-icon.component.html',
  styleUrl: './sidebar-icon.component.scss'
})

export class SidebarIconComponent {

  public icon: string = "fill-svg";

  constructor(public layoutService: LayoutService) { }

  svgIcon(val: string) {
    this.icon = val;
    this.layoutService.config.settings.icon = val;
    if (val == "fill-svg") {
      document.getElementsByTagName("page-sub-header")[0]?.setAttribute("icon", val);
    } else {
      document.getElementsByTagName("page-sub-header")[0]?.setAttribute("icon", val);
    }
  }

}
