import { Component } from '@angular/core';
import { Categories } from '../../../../shared/data/data/learning';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    standalone: true,
    imports: [NgbCollapse]
})
export class CategoriesComponent {

  public Categories = Categories;
  public isCollapsed = false;

}
