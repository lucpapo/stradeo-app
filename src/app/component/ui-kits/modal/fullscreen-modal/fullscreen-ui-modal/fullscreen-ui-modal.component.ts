import { Component, TemplateRef } from '@angular/core';
import { modalData } from '../../../../../shared/data/data/ui-kits/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-fullscreen-ui-modal',
    templateUrl: './fullscreen-ui-modal.component.html',
    styleUrls: ['./fullscreen-ui-modal.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})

export class FullscreenUiModalComponent {

  public FullscreenData = modalData;
  constructor(private modalService: NgbModal) { }

  fullScreenBelowModal(fullScreenBelowContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(fullScreenBelowContent, { fullscreen: true });
  }

}
