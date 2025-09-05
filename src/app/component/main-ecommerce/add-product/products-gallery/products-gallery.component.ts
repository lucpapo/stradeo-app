import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

@Component({
    selector: 'app-products-gallery',
    templateUrl: './products-gallery.component.html',
    styleUrls: ['./products-gallery.component.scss',
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, DropzoneModule]
})

export class ProductsGalleryComponent {

  @Output() activeSteps = new EventEmitter<number>(); 

  public activeStep: number = 2;
  public myForm = new FormGroup({});
  public image = '<img src="assets/images/product_upload.png" alt="" height="45"><h5>Drag your image here, or <a class="txt-primary">browser</a></h5> <span class="note needsclick">SVG,PNG,JPG or GIF</span>';
  public gallery = '<img src="assets/images/gallery_upload.png" alt="" height="45"><h5>Drag files here</h5><span class="note needsclick">Add Product Gallery Images</span>';
  public imageConfig: DropzoneConfigInterface = {
    clickable: true,
    url: 'https://httpbin.org/post',
    addRemoveLinks: true,
    acceptedFiles: 'image/*',
    maxFiles: 1
  };

  public galleryConfig: DropzoneConfigInterface = {
    clickable: true,
    url: 'https://httpbin.org/post',
    addRemoveLinks: true,
    acceptedFiles: 'image/*',
    uploadMultiple: true,
  };

  onUploadSuccess(args: any): void {
    console.log("onUploadSuccess:", args);
  }

  onUploadError(args: any): void {
    console.log("onUploadError:", args);
  }

  onUploadSuccessGallery(args: any): void {
    console.log("onUploadSuccess:", args);
  }

  onUploadErrorGallery(args: any): void {
    console.log("onUploadError:", args);
  }

  next(myForm: FormGroup) {
      const number = this.activeStep + 1;
      this.activeSteps.emit(number);
  }

  previous() {
    const number = this.activeStep - 1;
    this.activeSteps.emit(number);
  }
}
