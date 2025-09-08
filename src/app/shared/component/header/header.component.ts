import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../directive/outside.directive';
import { LayoutService } from '../../service/layout.service';
import { Menu, NavigationService } from '../../service/navigation.service';

import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { BookmarkComponent } from "./bookmark/bookmark.component";
import { CartComponent } from "./cart/cart.component";
import { CommonSvgIconsComponent } from "./common-svg-icons/common-svg-icons.component";
import { MessageComponent } from "./message/message.component";
import { ModeComponent } from "./mode/mode.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { ProfileComponent } from "./profile/profile.component";
import { LanguageComponent } from "./language/language.component";
import { ConcessionariaSelectorComponent } from "../concessionaria-selector/concessionaria-selector.component";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NotificationsComponent, BookmarkComponent, CartComponent,
    RouterModule, FormsModule, CommonModule, ClickOutsideDirective,
    MessageComponent, ProfileComponent, ModeComponent,
    CommonSvgIconsComponent, SvgIconComponent, LanguageComponent, ConcessionariaSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {

  public searchText: string = '';
  public navData: Menu[] = [];
  public menuItems: Menu[] = [];
  public open = false;
  public isSearch: boolean = false;
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;

  constructor(
    public layoutService: LayoutService, 
    public navigationService: NavigationService
  ) {
    this.navigationService.items.subscribe(response => {
      this.navData = response;
    });
  }

  ngOnInit(): void {
  }

  search(data: string) {
    data ? this.addFix() : this.removeFix();
    if (!data) return this.menuItems = [];
    let item: Menu[] = [];
    this.navData.forEach((element) => {
      if (element.title?.toLowerCase().includes(data) && element.type === 'link') {
        item.push(element);
      }
      element.children?.filter(children => {
        if (children.title?.toLowerCase().includes(data) && children.type === 'link') {
          children.icon = element.icon;
          item.push(children);
        }
        children.children?.filter(subChildren => {
          if (subChildren.title?.toLowerCase().includes(data)) {
            subChildren.icon = element.icon;
            item.push(subChildren)
          }
        })
        return
      })
      this.checkSearchResultEmpty(item);
      this.menuItems = item;
    })
    return
  }

  clickOutside(): void {
    this.open = false;
    this.searchText = '';
    this.searchResult = false;
    this.searchResultEmpty = false;
    document.body.classList.remove('offcanvas')
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.body.classList.add('offcanvas')
  }

  removeFix() {
    this.searchText = "";
    this.searchResult = false;
    document.body.classList.remove('offcanvas')
  }
}
