import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-fullscreen-below-md-modal',
    templateUrl: './fullscreen-below-md-modal.component.html',
    styleUrls: ['./fullscreen-below-md-modal.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class FullscreenBelowMdModalComponent {

  constructor(private modalService: NgbModal) { }

  fullScreenBelowMdModal(fullScreenBelowMdContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(fullScreenBelowMdContent, { size: 'md' });
  }

}
