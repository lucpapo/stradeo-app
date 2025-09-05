import { Component } from '@angular/core';
import { DropzoneConfigInterface, DropzoneModule } from "ngx-dropzone-wrapper";

@Component({
    selector: 'app-default-file-upload',
    templateUrl: './default-file-upload.component.html',
    styleUrls: ['./default-file-upload.component.scss'],
    standalone: true,
    imports: [DropzoneModule],
})
export class DefaultFileUploadComponent {

  public imageConfig: DropzoneConfigInterface = {
    clickable: true,
    url: 'https://httpbin.org/post',
    acceptedFiles: 'image/*',
    addRemoveLinks: true,
    parallelUploads: 1,
  };

  public text = 'Drag & Drop your files or <span class="text-danger">Browse</span>'

onUploadError(args: any): void {
  console.log("onUploadError:", args);
}

onUploadSuccess(args: any): void {
  console.log("onUploadSuccess:", args);
}

}
