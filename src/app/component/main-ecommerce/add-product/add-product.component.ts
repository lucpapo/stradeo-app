import { Component } from '@angular/core';
import { AddProduct } from '../../../shared/data/data/main-ecommerce/add-product';
import { AdvanceComponent } from './advance/advance.component';
import { SellingPriceComponent } from './selling-price/selling-price.component';
import { ProductsGalleryComponent } from './products-gallery/products-gallery.component';
import { AddProductsDetailsComponent } from './add-products-details/add-products-details.component';
import { CommonModule } from '@angular/common';
import { ProductFormStepComponent } from './product-form-step/product-form-step.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
    standalone: true,
    imports: [ProductFormStepComponent, CommonModule, AddProductsDetailsComponent, 
      ProductsGalleryComponent, ProductCategoriesComponent, SellingPriceComponent, AdvanceComponent]
})
export class AddProductComponent {

  public stepsData = AddProduct;
  public activeSteps!: number;

  ngOnInit() {
    const data = AddProduct.filter((data) => {
      return data.stepNumber === 1 ;
    });

    this.activeSteps = data[0].stepNumber;
  }

  receiveChildData(step: number) {
    this.activeSteps = step;
  }

}
