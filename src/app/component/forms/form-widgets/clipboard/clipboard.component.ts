import { Component } from '@angular/core';
import { CopyPortionFormParagraphComponent } from './copy-portion-form-paragraph/copy-portion-form-paragraph.component';
import { ClipboardOnParagraphComponent } from './clipboard-on-paragraph/clipboard-on-paragraph.component';
import { ClipboardOnTextareaComponent } from './clipboard-on-textarea/clipboard-on-textarea.component';
import { ClipboardTextInputComponent } from './clipboard-text-input/clipboard-text-input.component';

@Component({
    selector: 'app-clipboard',
    templateUrl: './clipboard.component.html',
    styleUrls: ['./clipboard.component.scss'],
    standalone: true,
    imports: [ClipboardTextInputComponent, ClipboardOnTextareaComponent, ClipboardOnParagraphComponent, CopyPortionFormParagraphComponent]
})

export class ClipboardComponent {

}
