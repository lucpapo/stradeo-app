import { Component } from '@angular/core';
import { MultiFileUploadComponent } from './multi-file-upload/multi-file-upload.component';
import { SingleFileUploadComponent } from './single-file-upload/single-file-upload.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { DefaultFileUploadComponent } from './default-file-upload/default-file-upload.component';

@Component({
    selector: 'app-dropzone',
    templateUrl: './dropzone.component.html',
    styleUrls: ['./dropzone.component.scss'],
    standalone: true,
    imports: [DefaultFileUploadComponent, ImagePreviewComponent, SingleFileUploadComponent, MultiFileUploadComponent]
})
export class DropzoneComponent {

}
