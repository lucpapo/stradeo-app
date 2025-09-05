import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-svg-icons',
  standalone: true,
  imports: [],
  templateUrl: './common-svg-icons.component.html',
  styleUrl: './common-svg-icons.component.scss'
})

export class CommonSvgIconsComponent {

  @Input() icon : any ;
  @Input() class : any ;

}
