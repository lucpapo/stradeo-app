import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../../service/layout.service';
import { LayoutTypeComponent } from "./layout-type/layout-type.component";
import { SidebarTypeComponent } from "./sidebar-type/sidebar-type.component";
import { SidebarIconComponent } from "./sidebar-icon/sidebar-icon.component";
import { ColorLayoutComponent } from "./color-layout/color-layout.component";
import { LightLayoutComponent } from "./light-layout/light-layout.component";
import { DarkLayoutComponent } from "./dark-layout/dark-layout.component";
import { MixLayoutComponent } from "./mix-layout/mix-layout.component";

@Component({
  selector: 'app-customizer',
  standalone: true,
  imports: [LayoutTypeComponent, SidebarTypeComponent, SidebarIconComponent, 
    ColorLayoutComponent, LightLayoutComponent, DarkLayoutComponent, MixLayoutComponent],
  templateUrl: './customizer.component.html',
  styleUrl: './customizer.component.scss'
})

export class CustomizerComponent {

  constructor(public layoutService: LayoutService, public modalService: NgbModal) {}

  openModal(popup: any) {
    this.modalService.open(popup, { backdropClass: 'dark-modal', centered: true });
  }

  copyText(data: any) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(data);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
