import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile-modal',
    templateUrl: './profile-modal.component.html',
    styleUrls: ['./profile-modal.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class ProfileModalComponent {

  constructor(private modalService: NgbModal) { }

  profileModal(profileContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(profileContent, { centered: true });
  }

}
