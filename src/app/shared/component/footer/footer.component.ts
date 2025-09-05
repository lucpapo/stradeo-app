import { Component } from '@angular/core';
import { CommonSvgIconsComponent } from "../header/common-svg-icons/common-svg-icons.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonSvgIconsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
