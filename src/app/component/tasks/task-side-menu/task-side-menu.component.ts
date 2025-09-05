import { Component, Output } from '@angular/core';
import * as Data from '../../../shared/data/data/task-list';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewTasksComponent } from '../tasks-modal/new-tasks/new-tasks.component';
import { AddTasksTagComponent } from '../tasks-modal/add-tasks-tag/add-tasks-tag.component';
import { AllTasksComponent } from '../all-tasks/all-tasks.component';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';
import { ClickOutsideDirective } from '../../../shared/directive/outside.directive';

@Component({
    selector: 'app-task-side-menu',
    templateUrl: './task-side-menu.component.html',
    styleUrls: ['./task-side-menu.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, FeatherIconComponent, AllTasksComponent]
})
export class TaskSideMenuComponent {
  
  @Output() selectedHeading_id: number;
  @Output() selectedTagId: number;
  public taskSideMenu = Data.TaskData;
  public taskTagSideMenu = Data.TagData;
  public open: boolean = false;

  constructor(private modalService: NgbModal) { }
  
  getData(title_id: number) {
    const getHeadingData = this.taskSideMenu.filter((data) => {
      return data.title_id === title_id
    })
    this.selectedHeading_id = getHeadingData[0].title_id
  }

  getTagData(title_id: number) {
    const getTagData = this.taskTagSideMenu.filter((data) => {
      return data.title_id === title_id
    })
    this.selectedTagId = getTagData[0].title_id
  }

  openMenu() {
    this.open = !this.open
  }

  openAddTask() {
    this.modalService.open(NewTasksComponent, { size: 'lg' })
  }

  openAddTag() {
    this.modalService.open(AddTasksTagComponent, { size: 'lg' })
  }
  
  clickOutside():void { 
    this.open = false;
  }

}
