import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-fullscreen-below-xxl-modal',
    templateUrl: './fullscreen-below-xxl-modal.component.html',
    styleUrls: ['./fullscreen-below-xxl-modal.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class FullscreenBelowXxlModalComponent {

  constructor(private modalService: NgbModal) { }

  fullScreenBelowXxlModal(fullScreenBelowXxlContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(fullScreenBelowXxlContent, { size: 'xxl' });
  }
  
}


