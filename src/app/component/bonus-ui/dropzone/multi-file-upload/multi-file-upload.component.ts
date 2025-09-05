import { Component } from '@angular/core';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-multi-file-upload',
    templateUrl: './multi-file-upload.component.html',
    styleUrls: ['./multi-file-upload.component.scss'],
    standalone: true,
    imports: [FormsModule, DropzoneModule]
})
export class MultiFileUploadComponent {

  public imageConfig: DropzoneConfigInterface = {
    clickable: true,
    url: 'https://httpbin.org/post',
    uploadMultiple: true,
    acceptedFiles: 'image/*',
    addRemoveLinks: true,
  };
  public text = '<i class="icon-cloud-up"></i><h4>Drop files here or click to upload.</h4><span>(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>'
  onUploadError(args: any): void {
    console.log("onUploadError:", args);
  }

  onUploadSuccess(args: any): void {
    console.log("onUploadSuccess:", args);
  }

  
}
