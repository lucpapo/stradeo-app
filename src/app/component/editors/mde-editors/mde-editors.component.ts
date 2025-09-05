import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

@Component({
    selector: 'app-mde-editors',
    templateUrl: './mde-editors.component.html',
    styleUrls: ['./mde-editors.component.scss'],
    standalone: true,
    imports: [AngularEditorModule, FormsModule]
})
export class MdeEditorsComponent {

  public htmlContent = '';

}
