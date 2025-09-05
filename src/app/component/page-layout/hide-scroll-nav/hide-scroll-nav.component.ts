import { Component, HostListener } from '@angular/core';
import { HideScrollNavService } from '../../../shared/service/hidescrollnav.service';

@Component({
  selector: 'app-hide-scroll-nav',
  standalone: true,
  imports:[],
  templateUrl: './hide-scroll-nav.component.html',
  styleUrls: ['./hide-scroll-nav.component.scss']
})

export class HideScrollNavComponent {

  constructor(public hideScrollNavService: HideScrollNavService){}

  @HostListener("window:scroll", [])

  onWindowScroll() {
    let number = window.pageYOffset || 0;
  	if (number > 252) { 
  	  this.hideScrollNavService.headerFixed = true;
  	} else {
  	  this.hideScrollNavService.headerFixed = false;
  	}        
  }
}
