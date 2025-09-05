import { Component } from '@angular/core';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-ngx-editor',
    templateUrl: './ngx-editor.component.html',
    styleUrl: './ngx-editor.component.scss',
    standalone: true,
    imports: [NgxEditorModule, FormsModule]
})

export class NgxEditorComponent {

  public editor: Editor;
  public html = '';

  ngOnInit(): void {
    this.editor = new Editor();
  }
  
  ngOnDestroy(): void {
    this.editor.destroy();
  }


}
