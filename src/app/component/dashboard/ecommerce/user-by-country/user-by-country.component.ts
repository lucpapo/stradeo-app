import { Component } from '@angular/core';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import L from 'leaflet';

@Component({
  selector: 'app-user-by-country',
  standalone: true,
  imports: [DropdownComponent, CommonSvgIconsComponent,LeafletModule],
  templateUrl: './user-by-country.component.html',
  styleUrl: './user-by-country.component.scss'
})

export class UserByCountryComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
  public options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: L.latLng(46.879966, -121.726909),
  };
}
