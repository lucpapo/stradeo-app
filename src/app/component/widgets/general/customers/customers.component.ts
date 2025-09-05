import { Component } from '@angular/core';
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonSvgIconsComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

}
