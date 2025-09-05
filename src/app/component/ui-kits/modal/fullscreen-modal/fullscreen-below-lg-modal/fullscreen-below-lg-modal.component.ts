import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-fullscreen-below-lg-modal',
    templateUrl: './fullscreen-below-lg-modal.component.html',
    styleUrls: ['./fullscreen-below-lg-modal.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})

export class FullscreenBelowLgModalComponent {

  constructor(private modalService: NgbModal) { }

  fullscreenBelowLgModal(content: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(content, { size: 'lg' });
  }

}
