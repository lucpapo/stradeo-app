import { Component } from '@angular/core';
import * as data from '../../../../shared/data/data/widgets' ;
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-offer-carousle',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './offer-carousle.component.html',
  styleUrl: './offer-carousle.component.scss'
})

export class OfferCarousleComponent {
 
  public slideData = data.products;

  public customOptions: OwlOptions = {
    loop: true, 
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
}
