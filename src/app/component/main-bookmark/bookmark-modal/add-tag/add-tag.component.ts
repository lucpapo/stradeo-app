import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-tag',
    templateUrl: './add-tag.component.html',
    styleUrls: ['./add-tag.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class AddTagComponent {

  constructor(public activeModal: NgbActiveModal) { }

}
