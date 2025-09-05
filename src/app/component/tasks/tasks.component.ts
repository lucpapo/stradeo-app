import { Component } from '@angular/core';
import { TaskSideMenuComponent } from './task-side-menu/task-side-menu.component';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
    standalone: true,
    imports: [TaskSideMenuComponent]
})
export class TasksComponent {

}
