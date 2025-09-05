import { Component, TemplateRef } from '@angular/core';
import { modalData } from '../../../../../shared/data/data/ui-kits/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-scrolling-content',
    templateUrl: './scrolling-content.component.html',
    styleUrls: ['./scrolling-content.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})

export class ScrollingContentComponent {

  public scrollData = modalData;
  constructor(private modalService: NgbModal) { }

  scrollingModal(scrollingContent: TemplateRef<NgbModal>) {
    const modalRef = this.modalService.open(scrollingContent);
  }

}
