import { Component, TemplateRef } from '@angular/core';
import { NgbModal, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { tr } from 'date-fns/locale';

@Component({
    selector: 'app-tooltips-popovers',
    templateUrl: './tooltips-popovers.component.html',
    styleUrls: ['./tooltips-popovers.component.scss'],
    standalone: true,
    imports:[NgbPopoverModule]
})

export class TooltipsPopoversComponent {

  constructor(private modalService: NgbModal) { }

  tooltipModal(tooltipModalContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(tooltipModalContent,{centered:true});
  }

}
