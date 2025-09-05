import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-extra-large-modal',
    templateUrl: './extra-large-modal.component.html',
    styleUrls: ['./extra-large-modal.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class ExtraLargeModalComponent {

  constructor(private modalService: NgbModal) { }

  extraLargeModal(extraLargeContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(extraLargeContent, { size: 'xl' });
  }

}
