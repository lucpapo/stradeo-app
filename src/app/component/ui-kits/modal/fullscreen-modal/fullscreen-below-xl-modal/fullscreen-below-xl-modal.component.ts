import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-fullscreen-below-xl-modal',
    templateUrl: './fullscreen-below-xl-modal.component.html',
    styleUrls: ['./fullscreen-below-xl-modal.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class FullscreenBelowXlModalComponent {

  constructor(private modalService: NgbModal) { }

  fullScreenBelowXlModal(fullScreenBelowXlContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(fullScreenBelowXlContent, { size: 'xl' });
  }

}
