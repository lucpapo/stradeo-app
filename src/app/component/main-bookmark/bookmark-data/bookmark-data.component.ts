import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { EditBookmarkComponent } from '../bookmark-modal/edit-bookmark/edit-bookmark.component';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';
import { AllBookmark, allBookmarkData, bookmarkDataInterface, tagData } from '../../../shared/data/data/bookmarks';

@Component({
    selector: 'app-bookmark-data',
    templateUrl: './bookmark-data.component.html',
    styleUrls: ['./bookmark-data.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent, EditBookmarkComponent]
})
export class BookmarkDataComponent {

  @Input() selectedHeadingId: number;
  @Input() selectTegTagId: number;

  public BookmarkData = allBookmarkData;
  public tag = tagData;
  public getBookmarkData: AllBookmark;
  public listBookmark: boolean = false;
  public editBookmarkData: bookmarkDataInterface[];
  public bookmarkData: bookmarkDataInterface[] = []
  public favoriteData: bookmarkDataInterface[];

  @ViewChild("editBookmarkModal") EditBookmarkModal: EditBookmarkComponent;

  ngOnInit(): void {
    this.BookmarkData.map((data) => {
      if (data.status) {
        this.getBookmarkData = data;
        for (let i of data.data) {
          this.bookmarkData.push(i)
        }
      }
    })
  }

  changeGrid() {
    this.listBookmark = false
  }
  changeList() {
    this.listBookmark = true
  }

  ngOnChanges(changes: SimpleChanges) {
    let id = changes['selectedHeadingId']?.currentValue;
    this.BookmarkData.map((data) => {
      if (data.title_id === id) {
        this.getBookmarkData = data;
      }
    })
    let tagId = changes['selectTegTagId']?.currentValue;

    this.tag.map((data) => {
      if (data.title_id === tagId) {
        this.getBookmarkData = data;
      }
    })
  }

  modal(id: number) {
    const a = this.bookmarkData.filter((data) => {
      return data.id === id;
    })
    this.editBookmarkData = a;
    this.EditBookmarkModal.openModal(this.editBookmarkData)
  }

  favorite(id: number) {
    this.favoriteData = this.BookmarkData[0].data.filter((data) => {
      return data.id === id;
    })
    this.favoriteData[0].favorite = !this.favoriteData[0].favorite;
  }

}
