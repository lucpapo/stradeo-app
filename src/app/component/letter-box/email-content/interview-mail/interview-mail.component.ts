import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Editor, NgxEditorModule } from "ngx-editor";
import { FormsModule } from "@angular/forms";
import { NgxPrintModule } from "ngx-print";
import { CommonModule } from "@angular/common";
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";
import { FeatherIconComponent } from "../../../../shared/component/header/feather-icon/feather-icon.component";

@Component({
    selector: "app-interview-mail",
    templateUrl: "./interview-mail.component.html",
    styleUrls: ["./interview-mail.component.scss"],
    standalone: true,
    imports: [
        CommonSvgIconsComponent,
        NgbTooltip,
        FeatherIconComponent,
        CommonModule,
        NgxPrintModule,
        NgxEditorModule,
        FormsModule,
    ],
})

export class InterviewMailComponent {

  public isBookmark: boolean = false;
  public isReply: boolean = false;

  @Input() open: boolean;
  @Output() childEvent = new EventEmitter();

  public editor: Editor;
  public html = '';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  clickValue(value: boolean) {
    value = false;
    this.childEvent.emit(value);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
