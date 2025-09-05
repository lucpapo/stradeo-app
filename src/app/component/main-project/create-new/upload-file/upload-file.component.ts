import { Component } from '@angular/core';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss'],
    standalone: true,
    imports: [DropzoneModule]
})
export class UploadFileComponent {

  public galleryConfig: DropzoneConfigInterface = {
    clickable: true,
    url: 'https://httpbin.org/post',
    addRemoveLinks: true,
    acceptedFiles: 'image/*',
    uploadMultiple: true,
  };

  public gallery = '<i class="icon-cloud-up"></i><h5 class="f-w-600">Drop files here or click to upload.</h5><span>(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>';
  
  onUploadSuccessGallery(args: any): void {
    console.log("onUploadSuccess:", args);
  }

  onUploadErrorGallery(args: any): void {
    console.log("onUploadError:", args);
  }

}
