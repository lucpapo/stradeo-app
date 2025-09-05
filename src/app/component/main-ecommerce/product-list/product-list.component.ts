import { Component } from '@angular/core';
import { TopSectionComponent } from './top-section/top-section.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    standalone: true,
    imports: [TopSectionComponent]
})
export class ProductListComponent {

}
