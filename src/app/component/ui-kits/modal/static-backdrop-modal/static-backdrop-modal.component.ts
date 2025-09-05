import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-static-backdrop-modal',
    templateUrl: './static-backdrop-modal.component.html',
    styleUrls: ['./static-backdrop-modal.component.scss'],
    standalone: true,
    imports: [FormsModule]
})

export class StaticBackdropModalComponent {

  constructor(private modalService: NgbModal) { }

  StaticBackdropModal(StaticBackdropContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(StaticBackdropContent);
  }

}
