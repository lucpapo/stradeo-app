import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-result-modal',
    templateUrl: './result-modal.component.html',
    styleUrls: ['./result-modal.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class ResultModalComponent {

  constructor(private modalService: NgbModal) { }

  ResultModal(resultcontant: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(resultcontant, { centered: true });
  }
  
}

