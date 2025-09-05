import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

@Component({
    selector: 'app-new-categories',
    templateUrl: './new-categories.component.html',
    styleUrls: ['./new-categories.component.scss'],
    standalone: true,
    imports: [AngularEditorModule, FormsModule]
})
export class NewCategoriesComponent {
  
  public htmlContent = '';

  constructor(public activeModal: NgbActiveModal) { }


}
