import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Project, ProjectList } from '../../../shared/data/data/project-list';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    standalone: true,
    imports: [CommonModule, FeatherIconComponent, RouterLink]
})
export class ProjectListComponent {

  public active = 1
  public openTab: string = "All";
  public ProjectLists = ProjectList
  public listUser: Project[] = [];
  public filterData: Project[] = this.ProjectLists

  public tabbed(val: string) {
    this.openTab = val
    this.filterData = val !== 'All' ? this.ProjectLists.filter((data: Project) => {
      return data.badge == this.openTab ? true : false
    }) : this.ProjectLists
  }

}
