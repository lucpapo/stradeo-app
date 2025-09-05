import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AllBookmark, bookmarkDataInterface } from '../../../../shared/data/data/bookmarks';

@Component({
    selector: 'app-edit-bookmark',
    templateUrl: './edit-bookmark.component.html',
    styleUrls: ['./edit-bookmark.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class EditBookmarkComponent {
  
  public closeResult: string;
  public modalOpen: boolean = false;

  public bookmarkDetails: bookmarkDataInterface[];
  
  show() {
    throw new Error('Method not implemented.');
  }

  @ViewChild("editBookmarkModal", { static: false }) editBookmarkModal: TemplateRef<AllBookmark>;

  constructor(private modalService: NgbModal) { }

  async openModal(data: bookmarkDataInterface[]) {
    this.bookmarkDetails = data;
    this.modalOpen = true;

    this.modalService.open(this.editBookmarkModal, {
      ariaLabelledBy: 'EditBookmark-Modal',
      windowClass: 'modal-lg modal-dialog-centered'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
