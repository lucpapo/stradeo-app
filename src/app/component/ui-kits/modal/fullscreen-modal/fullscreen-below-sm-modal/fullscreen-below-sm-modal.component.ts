import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-fullscreen-below-sm-modal',
    templateUrl: './fullscreen-below-sm-modal.component.html',
    styleUrls: ['./fullscreen-below-sm-modal.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class FullscreenBelowSmModalComponent {

  constructor(private modalService: NgbModal) { }

  fullScreenBelowSmModal(fullScreenBelowSmContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(fullScreenBelowSmContent, { size: 'sm' });
  }

}
