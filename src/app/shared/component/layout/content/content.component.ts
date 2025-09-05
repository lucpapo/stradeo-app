import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HideScrollNavService } from '../../../service/hidescrollnav.service';
import { LayoutService } from '../../../service/layout.service';
import { NavigationService } from '../../../service/navigation.service';
import { BreadcrumbComponent } from "../../breadcrumb/breadcrumb.component";
import { CustomizerComponent } from "../../customizer/customizer.component";
import { FooterComponent } from "../../footer/footer.component";
import { HeaderComponent } from "../../header/header.component";
import { LoaderComponent } from "../../loader/loader.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent,
    RouterModule, BreadcrumbComponent, CommonModule, LoaderComponent, CustomizerComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})

export class ContentComponent {

  public footerFix: boolean = false;
  public footerLight: boolean = false;
  public footerDark: boolean = false;
  public innerWidth: number;

  constructor(public layoutService: LayoutService,
    public hideScrollNavServices: HideScrollNavService,
    public navigationService: NavigationService) {
  }

  @HostListener('window:resize', ['$event'])

  onResize(event: number) {
    this.navigationService.collapseSidebar = window.innerWidth < 1200 ? true : false;
    if (window.innerWidth < 1200) {
      this.layoutService.config.settings.sidebar_type = 'compact-wrapper'
    }
  }

  ngOnInit() {
    if (localStorage.getItem('mode') == 'dark-only') {
      document.body?.classList.add("dark-only");
    }
    this.innerWidth = window.innerWidth;
  }

  ngDoCheck() {
    if (window.location.pathname == "/page-layout/footer-dark") {
      this.footerDark = true;
      this.footerLight = false;
      this.footerFix = false;
    } else if (window.location.pathname == '/page-layout/footer-light') {
      this.footerLight = true;
      this.footerDark = false;
      this.footerFix = false;
    } else if (window.location.pathname == '/page-layout/footer-fixed') {
      this.footerFix = true;
      this.footerLight = false;
      this.footerDark = false;
    }
  }

}
