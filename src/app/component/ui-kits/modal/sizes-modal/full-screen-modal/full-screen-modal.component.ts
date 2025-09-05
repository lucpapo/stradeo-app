import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-full-screen-modal',
    templateUrl: './full-screen-modal.component.html',
    styleUrls: ['./full-screen-modal.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class FullScreenModalComponent {

  constructor(private modalService: NgbModal) { }

  FullScreenModal(fullScreenContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(fullScreenContent, { fullscreen: true });
  }

}
