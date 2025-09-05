import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class AddCategoryComponent {

  constructor(public activeModal: NgbActiveModal) { }

}
