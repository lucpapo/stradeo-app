import { Component, Input } from '@angular/core';
import { topChart } from '../../../../shared/data/data/widgets';
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-chart',
  standalone: true,
  imports: [CommonSvgIconsComponent, DropdownComponent,NgbProgressbarModule],
  templateUrl: './top-chart.component.html',
  styleUrl: './top-chart.component.scss'
})

export class TopChartComponent {

  @Input() data : topChart;
  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];

}
