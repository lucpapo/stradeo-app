import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-label',
    templateUrl: './add-label.component.html',
    styleUrls: ['./add-label.component.scss'],
    standalone: true,
    imports: [FormsModule]
})

export class AddLabelComponent {
  
  constructor(private modal: NgbModal) {}

  close() {
    this.modal.dismissAll();
  }

}
