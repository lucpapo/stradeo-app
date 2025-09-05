import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-open-modal-kabul',
    templateUrl: './open-modal-kabul.component.html',
    styleUrls: ['./open-modal-kabul.component.scss'],
    standalone: true,
    imports: [FormsModule, CommonModule]
})
export class OpenModalKabulComponent {

  public validate = false;

  constructor(private modalService: NgbModal) { }

  public submit() {
    this.validate = !this.validate;
    this.validate = true;
  }

  OpenModal(openModel: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(openModel);
  }

}
