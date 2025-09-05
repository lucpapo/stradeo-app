import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CreatedProject } from '../../../../shared/data/chart/widgets';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";

@Component({
    selector: 'app-project-created',
    templateUrl: './project-created.component.html',
    styleUrls: ['./project-created.component.scss'],
    standalone: true,
    imports: [NgApexchartsModule, DropdownComponent]
})
export class ProjectCreatedComponent {

  public projectCreatedChart = CreatedProject;
  public isOpen: boolean = false;
  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];

  clickOutside(): void {
    this.isOpen = false;
  }

}
