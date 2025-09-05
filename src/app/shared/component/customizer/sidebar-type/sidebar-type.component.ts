import { Component, HostListener } from '@angular/core';
import { LayoutService } from '../../../service/layout.service';

@Component({
  selector: 'app-sidebar-type',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-type.component.html',
  styleUrl: './sidebar-type.component.scss'
})

export class SidebarTypeComponent {

  public screenwidth = window.innerWidth;
  public sidebarType: string = "compact-wrapper";

  constructor(public layoutService: LayoutService) {}

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.screenwidth = window.innerWidth;
  }

  customizeSidebarType(value: string) {
    if (this.screenwidth < 1200) {
      if (value == "horizontal-wrapper") {
        this.layoutService.config.settings.sidebar_type = "compact-wrapper";
      }
    } else {
      this.sidebarType = value;
      this.layoutService.config.settings.sidebar_type = value;
      this.layoutService.isOpen = false;
    }
  }

}
