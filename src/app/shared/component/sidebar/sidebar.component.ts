import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutService } from '../../service/layout.service';
import { Menu, NavigationService } from '../../service/navigation.service';
import { CommonSvgIconsComponent } from "../header/common-svg-icons/common-svg-icons.component";
import { FeatherIconComponent } from "../header/feather-icon/feather-icon.component";
import { SvgIconComponent } from "../svg-icon/svg-icon.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FeatherIconComponent, CommonSvgIconsComponent, TranslateModule,
    CommonModule, RouterModule, SvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {


  public pinnedDataList: string[] = [];
  public menuItemsList: Menu[] = [];
  public pinnedData: boolean = false;
  public leftArrowNone: boolean = true;
  public rightArrowNone: boolean = false;
  public margin: number = 0;
  public width: number = window.innerWidth;

  @HostListener("window:resize", ["$event"])
  onResize(event: { target: { innerWidth: number } }) {
    this.width = event.target.innerWidth - 500;
  }

  constructor(public navigationService: NavigationService,
    private router: Router,
    public layoutService: LayoutService
  ) {
    this.navigationService.items.subscribe(menuItems => {
      this.menuItemsList = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.menuItemsList.filter((items: Menu) => {
            if (items.path === event.url) {
              this.setNavActive(items);
            }
            if (!items.children) {
              return false;
            }
            items.children.filter((subItems: Menu) => {
              if (subItems.path === event.url) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) {
                return false;
              }
              subItems.children.filter((subSubItems: Menu) => {
                if (subSubItems.path === event.url) {
                  this.setNavActive(subSubItems);
                }
              });
              return;
            });
            return;
          });
        }
      });
    })
  }

  setNavActive(item: Menu) {
    this.menuItemsList.filter(menuItem => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          } else {
            submenuItems.active = false;
          }
        });
      }
    });
  }

  isPined(itemName: string | undefined): boolean {
    return itemName !== undefined && this.pinnedDataList?.includes(itemName);
  }

  pinned(title: string) {
    const index = this.pinnedDataList.indexOf(title);
    if (index !== -1) {
      this.pinnedDataList.splice(index, 1);
    } else {
      this.pinnedDataList.push(title);
    }
    if (this.pinnedDataList.length <= 0) {
      this.pinnedData = false;
    } else {
      this.pinnedData = true;
    }
  }

  toggletNavActive(item: Menu) {
    if (!item.active) {
      this.menuItemsList.forEach((a: Menu) => {
        if (this.menuItemsList.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: Menu) => {
          if (a.children?.includes(item)) {
            b.active = false;
          }
        });
        return;
      });
    }
    item.active = !item.active;
  }

  toggleMenu() {
    this.navigationService.collapseSidebar = !this.navigationService.collapseSidebar;
  }

  scrollToLeft() {
    if (this.margin >= -this.width) {
      this.margin = 0;
      this.leftArrowNone = true;
      this.rightArrowNone = false;
    } else {
      this.margin += this.width;
      this.rightArrowNone = false;
    }
  }

  scrollToRight() {
    if (this.margin <= -3500) {
      this.margin = -3000;
      this.leftArrowNone = false;
      this.rightArrowNone = true;
    } else {
      this.margin += -this.width;
      this.leftArrowNone = false;
    }
  }

}
