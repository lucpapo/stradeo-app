import { Component } from '@angular/core';
import { ProductDataTableComponent } from '../product-data-table/product-data-table.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-top-section',
    templateUrl: './top-section.component.html',
    styleUrls: ['./top-section.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent, CommonModule, RouterLink, FormsModule, ProductDataTableComponent]
})
export class TopSectionComponent {

  public togglecollpese = false;

  toggle() {
    this.togglecollpese = !this.togglecollpese;
  }

}
