import { Component, ViewChild } from '@angular/core';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { NgxMasonryComponent, NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-masonry-with-des',
  templateUrl: './masonry-with-des.component.html',
  styleUrls: ['./masonry-with-des.component.scss'],
  standalone: true,
  imports: [GallerizeDirective, NgxMasonryModule]
})
export class MasonryWithDesComponent {

  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
  };

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  public masonryImages: (string | boolean)[][];
  public limit = 20;

  dummyPictures = [
    [false, 'assets/images/masonry/1.jpg'],
    [false, 'assets/images/masonry/2.jpg'],
    [false, 'assets/images/masonry/3.jpg'],
    [false, 'assets/images/masonry/4.jpg'],
    [false, 'assets/images/masonry/5.jpg'],
    [false, 'assets/images/masonry/6.jpg'],
    [false, 'assets/images/masonry/8.jpg'],
    [false, 'assets/images/masonry/9.jpg'],
    [false, 'assets/images/masonry/10.jpg'],
    [false, 'assets/images/masonry/11.jpg'],
    [false, 'assets/images/masonry/12.jpg'],
    [false, 'assets/images/masonry/14.jpg'],
    [false, 'assets/images/masonry/15.jpg'],
    [false, 'assets/images/masonry/13.jpg'],
  ];

  ngOnInit() {
    this.masonryImages = this.dummyPictures.slice(0, this.limit);
  }

  itemsLoaded() {}

}
