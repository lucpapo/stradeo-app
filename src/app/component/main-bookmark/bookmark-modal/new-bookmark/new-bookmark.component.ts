import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-bookmark',
    templateUrl: './new-bookmark.component.html',
    styleUrls: ['./new-bookmark.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class NewBookmarkComponent {

  constructor(public activeModal: NgbActiveModal) { }


}
