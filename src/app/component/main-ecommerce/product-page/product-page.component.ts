import { Component } from '@angular/core';
import { Image, GalleryModule } from '@ks89/angular-modal-gallery';
import { DescriptionTabComponent } from './description-tab/description-tab.component';
import { BrandComponent } from './brand/brand.component';
import { DetailsComponent } from './details/details.component';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss'],
    standalone: true,
    imports: [GalleryModule, DetailsComponent, BrandComponent, DescriptionTabComponent]
})
export class ProductPageComponent {

  public imagesRect: Image[] = [
    new Image(0, { img: 'assets/images/ecommerce/01.jpg' }, { img: 'assets/images/ecommerce/01.jpg' }),
    new Image(1, { img: 'assets/images/ecommerce/02.jpg' }, { img: 'assets/images/ecommerce/02.jpg' }),
    new Image(2, { img: 'assets/images/ecommerce/03.jpg' }, { img: 'assets/images/ecommerce/03.jpg' }),
    new Image(3, { img: 'assets/images/ecommerce/04.jpg' }, { img: 'assets/images/ecommerce/04.jpg' }),
    new Image(4, { img: 'assets/images/ecommerce/05.jpg' }, { img: 'assets/images/ecommerce/05.jpg' }),
    new Image(5, { img: 'assets/images/ecommerce/06.jpg' }, { img: 'assets/images/ecommerce/06.jpg' }),
    new Image(6, { img: 'assets/images/ecommerce/07.jpg' }, { img: 'assets/images/ecommerce/07.jpg' }),
    new Image(7, { img: 'assets/images/ecommerce/08.jpg' }, { img: 'assets/images/ecommerce/08.jpg' }),
  ]

}
