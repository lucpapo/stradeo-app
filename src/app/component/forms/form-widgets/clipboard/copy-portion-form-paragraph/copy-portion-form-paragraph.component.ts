import { Component } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
    selector: 'app-copy-portion-form-paragraph',
    templateUrl: './copy-portion-form-paragraph.component.html',
    styleUrls: ['./copy-portion-form-paragraph.component.scss'],
    standalone: true
})
export class CopyPortionFormParagraphComponent {

  public copyHighlightTxt: string = 'Web design is the process of creating websites';
  public basic = false;
  public copyText: string = "";

  constructor(private _clipboardService: ClipboardService) { }

  callServiceToCopy() {
    this._clipboardService.copy('This is copy thru service copyFromContent directly');
  }

  onCopyFailure() {
    alert('copy fail!');
  }

  copyFunction(txt: string) {
    navigator.clipboard.writeText(txt);
    alert("Copied")

  }

  ngOnInit(): void {
    this._clipboardService.copyResponse$.subscribe(re => {
      if (re.isSuccess) {
        alert('copy success!');
      }
    });
  }

}
