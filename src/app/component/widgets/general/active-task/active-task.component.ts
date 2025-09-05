import { Component } from '@angular/core';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";
import * as data from '../../../../shared/data/data/widgets';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-active-task',
  standalone: true,
  imports: [DropdownComponent, CommonSvgIconsComponent,RouterModule],
  templateUrl: './active-task.component.html',
  styleUrl: './active-task.component.scss'
})

export class ActiveTaskComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
  public activeTasks = data.activeTasks;

  deleteTask(index: number,): void {
    if (index >= 0 && index < this.activeTasks.length) {
      this.activeTasks.splice(index, 1); 
    }
  }

} 
