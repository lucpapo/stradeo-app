import { Component, Input } from '@angular/core';
import { SvgIconComponent } from "../../../../shared/component/svg-icon/svg-icon.component";
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-online-offline-order',
  standalone: true,
  imports: [SvgIconComponent, CommonSvgIconsComponent,NgApexchartsModule],
  templateUrl: './online-offline-order.component.html',
  styleUrl: './online-offline-order.component.scss'
})

export class OnlineOfflineOrderComponent {

  @Input() data : any ;


}
