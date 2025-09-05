import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-balance-modal',
    templateUrl: './balance-modal.component.html',
    styleUrls: ['./balance-modal.component.scss'],
    standalone: true,
    imports: [RouterLink, FeatherIconComponent]
})
export class BalanceModalComponent {

  constructor(private modalService: NgbModal) { }

  BalanceModal(Balancecontant: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(Balancecontant, { centered: true });
  }

}
