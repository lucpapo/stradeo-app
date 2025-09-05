import { Component } from '@angular/core';
import { LayoutService } from '../../../service/layout.service';

@Component({
  selector: 'app-layout-type',
  standalone: true,
  imports: [],
  templateUrl: './layout-type.component.html',
  styleUrl: './layout-type.component.scss'
})

export class LayoutTypeComponent {

  public layoutType: string = "ltr";

  constructor(public layoutService: LayoutService) {}

  customizeLayoutType(value: string) {
    this.layoutType = value;
    this.layoutService.config.settings.layout_type = value;
    if (value == "rtl") {
      document.getElementsByTagName("html")[0].setAttribute("dir", value);
      document.body.className = "rtl";
    } else if (value == "box-layout") {
      document.getElementsByTagName("html")[0].setAttribute("dir", value);
      document.body.className = "box-layout";
    } else {
      document.getElementsByTagName("html")[0].removeAttribute("dir");
      document.body.className = "";
    }
  }
}
