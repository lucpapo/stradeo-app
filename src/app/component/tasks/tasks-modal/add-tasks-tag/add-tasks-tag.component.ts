import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-add-tasks-tag',
    templateUrl: './add-tasks-tag.component.html',
    styleUrls: ['./add-tasks-tag.component.scss'],
    standalone: true
})
export class AddTasksTagComponent {

  constructor(public activeModal: NgbActiveModal) { }

}
