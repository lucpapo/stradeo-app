import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-small-modal',
    templateUrl: './small-modal.component.html',
    styleUrls: ['./small-modal.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class SmallModalComponent {

  constructor(private modalService: NgbModal) { }

  SmallModal(smallContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(smallContent, { size: 'sm' });
  }

}
