import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-large-modal',
    templateUrl: './large-modal.component.html',
    styleUrls: ['./large-modal.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class LargeModalComponent {

  constructor(private modalService: NgbModal) { }

  LargeModal(largeContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(largeContent, { size: 'lg' });
  }

}
