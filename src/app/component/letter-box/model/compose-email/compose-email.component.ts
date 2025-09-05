import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Editor, NgxEditorModule } from "ngx-editor";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-compose-email",
    templateUrl: "./compose-email.component.html",
    styleUrls: ["./compose-email.component.scss"],
    standalone: true,
    imports: [FormsModule, NgxEditorModule],
})

export class ComposeEmailComponent {
  
  public isCc: boolean = false;
  public isBcc: boolean = false;
  public editor: Editor;
  public html = '';

  constructor(private modal: NgbModal) {}

  ngOnInit(): void {
    this.editor = new Editor();
  }
  
  close() {
    this.modal.dismissAll();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
