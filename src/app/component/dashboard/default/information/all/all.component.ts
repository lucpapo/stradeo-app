import { Component } from '@angular/core';
import { CommonSvgIconsComponent } from "../../../../../shared/component/header/common-svg-icons/common-svg-icons.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [CommonSvgIconsComponent,RouterModule],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent {

}
