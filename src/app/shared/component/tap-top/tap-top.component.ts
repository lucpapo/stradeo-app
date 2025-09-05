import { Component, HostListener } from '@angular/core';
import { FeatherIconComponent } from "../header/feather-icon/feather-icon.component";
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-tap-top',
  standalone: true,
  imports: [FeatherIconComponent,CommonModule],
  templateUrl: './tap-top.component.html',
  styleUrl: './tap-top.component.scss'
})

export class TapTopComponent {

  public show: boolean = false;

  constructor(private viewScroller: ViewportScroller) { }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number > 600) { 
  	  this.show = true;
  	} else {
  	  this.show = false;
  	}
  }

  tapToTop() {
  	this.viewScroller.scrollToPosition([0, 0]);
  }

}
