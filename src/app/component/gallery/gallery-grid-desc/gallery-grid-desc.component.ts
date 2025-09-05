import { Component } from '@angular/core';
import { galleryGrid } from '../../../shared/data/data/gallery/gallery-grid';
import { Lightbox, GallerizeDirective } from 'ng-gallery/lightbox';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';

@Component({
    selector: 'app-gallery-grid-desc',
    templateUrl: './gallery-grid-desc.component.html',
    styleUrls: ['./gallery-grid-desc.component.scss'],
    standalone: true,
    imports: [GallerizeDirective]
})
export class GalleryGridDescComponent {

  public galleryGrid = galleryGrid;
  public items!: GalleryItem[];

  constructor(public gallery: Gallery, public lightbox: Lightbox) { }

  ngOnInit() {

    this.items = this.galleryGrid.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
    const lightboxRef = this.gallery.ref('lightbox');

    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    lightboxRef.load(this.items)
  }

}
