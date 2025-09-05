import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Menu, NavigationService } from '../../../service/navigation.service';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { CommonSvgIconsComponent } from "../common-svg-icons/common-svg-icons.component";
import { FeatherIconComponent } from "../feather-icon/feather-icon.component";

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [FeatherIconComponent, CommonSvgIconsComponent, RouterModule,
    FormsModule, SvgIconComponent, CommonModule],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss'
})

export class BookmarkComponent {

  public text: string = "";
  public bookmark: Menu[] = [];
  public filterBookmark: Menu[] = [];
  public bookmarkItems: Menu[] = [];
  public open: boolean = false;
  public bookmarkFlip: boolean = false;
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public isBookmark: boolean = false;

  constructor(public navServices: NavigationService) { }

  ngOnInit(): void {
    this.navServices.items.subscribe((menuItems: Menu[]) => {
      this.bookmark = menuItems;
      this.bookmark.forEach((data) => {
        if (data.bookmark) {
          this.bookmarkItems.push(data);
        }
        if (!data.children) return false;
        data.children.filter((subItems) => {
          if (subItems.bookmark) {
            this.bookmarkItems.push(subItems);
          }
        });
        return;
      })
    })
  }

  ToggleSearch() {
    this.open = !this.open;
    this.removeFix();
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return this.filterBookmark = [];
    let items: Menu[] = [];
    term = term.toLowerCase();
    this.bookmark.forEach((element) => {
      if (element.title?.toLowerCase().includes(term) && element.type === 'link') {
        items.push(element);
      }
      element.children?.filter(subItems => {
        if (subItems.title?.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = element.icon;
          items.push(subItems);
        }
        subItems.children?.filter((suSubItems: Menu) => {
          if (suSubItems.title?.toLowerCase().includes(term)) {
            suSubItems.icon = element.icon;
            items.push(suSubItems);
          }
        })
        return
      })
      this.checkSearchResultEmpty(items)
      this.filterBookmark = items ;
    })
    return ;
  }

  openBookmarkSearch() {
    this.open = !this.open;
    this.removeFix();
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    var addFix = document.getElementById("#canvas-bookmark");
    addFix?.classList.add("offcanvas-bookmark")
  }

  removeFix() {
    this.searchResult = false;
    this.text = "";
    var removeFix = document.getElementById("#canvas-bookmark");
    removeFix?.classList.add("offcanvas-bookmark")
  }

  addToBookmark(items: Menu) {
    const index = this.bookmarkItems.indexOf(items);
    if (index === -1 && !items.bookmark) {
      items.bookmark = true;
      this.bookmarkItems.push(items);
      this.text = "";
    } else {
      this.bookmarkItems.splice(index, 1);
      items.bookmark = false;

    }
  }

  clickOutside(): void {
    this.searchResult = false;
    this.searchResultEmpty = false;
  }

}
