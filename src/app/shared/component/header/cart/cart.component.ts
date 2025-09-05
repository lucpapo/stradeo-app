import { Component } from '@angular/core';
import { CommonSvgIconsComponent } from "../common-svg-icons/common-svg-icons.component";
import { FeatherIconComponent } from "../feather-icon/feather-icon.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonSvgIconsComponent, FeatherIconComponent,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent {

  public isCart: boolean = false;

}
