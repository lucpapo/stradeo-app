import { Component, Input } from "@angular/core";
import * as data from  '../../../../shared/data/data/dashboard';
import { NgApexchartsModule } from "ng-apexcharts";
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";

@Component({
  selector: "app-common-chart",
  standalone: true,
   imports: [NgApexchartsModule, DropdownComponent],
  templateUrl: "./common-chart.component.html",
  styleUrls: ["./common-chart.component.scss"],
})

export class CommonChartComponent {

  public isShow: boolean = false;
  @Input() chartData:data.commonTopData | any;
  @Input() item: data.commonTopData[];
  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];

  clickOutside(): void {
    this.isShow = false;
  }

}
