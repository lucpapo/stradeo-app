import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-additional-options',
  templateUrl: './additional-options.component.html',
  styleUrls: ['./additional-options.component.scss'],
  standalone: true,
  imports: [FormsModule, AngularEditorModule, TagInputModule]
})

export class AdditionalOptionsComponent {

  public htmlContent = '';
  public items = ['watches', 'sports', 'clothes', 'bottles'];
}
