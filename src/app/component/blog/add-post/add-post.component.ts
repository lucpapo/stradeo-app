import { Component } from "@angular/core";
import { DropzoneConfigInterface, DropzoneModule } from "ngx-dropzone-wrapper";
import { Editor, NgxEditorModule } from "ngx-editor";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-add-post",
    templateUrl: "./add-post.component.html",
    styleUrls: ["./add-post.component.scss"],
    standalone: true,
    imports: [
        FormsModule,
        NgSelectModule,
        NgxEditorModule,
        DropzoneModule,
    ],
})

export class AddPostComponent {

  public files: File[] = [];
  public selectedCityIds: string[] = [];

  public cities2 = [
    { id: 1, name: "LifeStyle" },
    { id: 2, name: "Travel" },
  ];

  public imageConfig: DropzoneConfigInterface = {
    clickable: true,
    url: 'https://httpbin.org/post',
    acceptedFiles: 'image/*',
    addRemoveLinks: true,
    parallelUploads: 1,
  };

  public text = '<i class="icon-cloud-up"></i> <h6 class="f-w-600 mb-0">Drop files here or click to upload </h6>'
  public editor: Editor;
  public html = '';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  onUploadError(args: any): void {
    console.log("onUploadError:", args);
  }

  onUploadSuccess(args: any): void {
    console.log("onUploadSuccess:", args);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
