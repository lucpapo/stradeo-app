import { Component, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-toggle-between-modals',
    templateUrl: './toggle-between-modals.component.html',
    styleUrls: ['./toggle-between-modals.component.scss'],
    standalone: true
})
export class ToggleBetweenModalsComponent {

  public modalRef1: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  togglefristmodal(togglefristcontent: TemplateRef<NgbModal>) {
    this.modalRef1 = this.modalService.open(togglefristcontent, { centered: true });
  }

  togglesecoundmodal(togglesecoundcontent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(togglesecoundcontent, { centered: true });
    this.modalRef1.dismiss();
  }

}
