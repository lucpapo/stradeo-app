import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class SimpleComponent {

  constructor(private modalService: NgbModal) { }

  simpleModal(simpleContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(simpleContent);
  }

}
