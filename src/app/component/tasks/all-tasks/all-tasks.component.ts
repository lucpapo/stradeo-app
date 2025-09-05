import { Component, Input, SimpleChanges } from '@angular/core';
import * as Data from '../../../shared/data/data/task-list';
import { CommonModule } from '@angular/common';
import { FeatherIconComponent } from "../../../shared/component/header/feather-icon/feather-icon.component";

@Component({
    selector: 'app-all-tasks',
    templateUrl: './all-tasks.component.html',
    styleUrls: ['./all-tasks.component.scss'],
    standalone: true,
    imports: [CommonModule, FeatherIconComponent, FeatherIconComponent]
})
export class AllTasksComponent {
  
  @Input() heading_id: number;
  @Input() selectedTagId: number;

  public taskData = Data.TaskData;
  public tagData = Data.TagData;
  public getTaskData: Data.Tasklist;

  ngOnInit(): void {
    this.taskData.map((data) => {
      if (data.status) {
        this.getTaskData = data;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    let id = changes['heading_id']?.currentValue;
    this.taskData.map((data) => {
      if (data.title_id === id) {
        this.getTaskData = data;
      }
    })

    let tagId = changes['selectedTagId']?.currentValue;
    this.tagData.map((data) => {
      if (data.title_id === tagId) {
        this.getTaskData = data
      }
    })
  }

}
