import { Component, Output } from '@angular/core';
import { allBookmarkData, tagData } from '../../../shared/data/data/bookmarks';
import { AddTagComponent } from '../bookmark-modal/add-tag/add-tag.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewBookmarkComponent } from '../bookmark-modal/new-bookmark/new-bookmark.component';
import { BookmarkDataComponent } from '../bookmark-data/bookmark-data.component';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';
import { ClickOutsideDirective } from '../../../shared/directive/outside.directive';

@Component({
    selector: 'app-bookmark-side-menu',
    templateUrl: './bookmark-side-menu.component.html',
    styleUrls: ['./bookmark-side-menu.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, FeatherIconComponent, BookmarkDataComponent]
})
export class BookmarkSideMenuComponent {

  @Output()!selectedHeading_id: number;
  @Output()!selectedTagId: number;

  public open: boolean = false;
  public BookmarkData = allBookmarkData;
  public tag = tagData;

  constructor(private modalService: NgbModal) { }

  openMenu() {
    this.open = !this.open
  }
  
  clickOutside():void { 
    this.open = false;
  }

  openAddBookmark() {
    const modalRef = this.modalService.open(NewBookmarkComponent, { size: 'lg' });
  }

  openAddTag() {
    const modalRef = this.modalService.open(AddTagComponent, { size: 'lg' });
  }

  getData(title_id: number) {
    const getHeadingData = this.BookmarkData.filter((data) => {
      return data.title_id === title_id
    })
    this.selectedHeading_id = getHeadingData[0].title_id!
  }

  getTagData(title_id: number) {
    const getHeadingData = this.tag.filter((data) => {
      return data.title_id === title_id
    })
    this.selectedTagId = getHeadingData[0].title_id!
  }

}
