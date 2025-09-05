import { Component } from '@angular/core';
import { LayoutService } from '../../../service/layout.service';

@Component({
  selector: 'app-mix-layout',
  standalone: true,
  imports: [],
  templateUrl: './mix-layout.component.html',
  styleUrl: './mix-layout.component.scss'
})

export class MixLayoutComponent {

  public layoutType: string = "dark-sidebar";

  constructor(public layoutService: LayoutService) {
  }

  customizeLayoutType(val: string) {
    this.layoutType = val;
    this.layoutService.config.settings.mix_layout = val;
    document.body?.classList.remove("dark-sidebar", "dark-only");
    if (val === "dark-sidebar") {
      document.body?.classList.add("dark-sidebar");
    } else {
      document.body?.classList.add("dark-only");
    }
  }

}
