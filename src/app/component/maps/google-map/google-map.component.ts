import { Component ,ViewChild} from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss'],
    standalone: true,
    imports: [GoogleMap, MapMarker]
})
export class GoogleMapComponent {

  public markers: any[];
  public zoom: number;

  constructor() {
    this.markers = [];
    this.zoom = 2;
  }

  ngOnInit() {
    this.markers.push({
      position: {
        lat: 35.717,
        lng: 139.731
      },
      label: {
        color: "black",
        text: "Madrid"
      },
      Option:{
        draggable: true,
        animation: google.maps.Animation.DROP,
      }
    });

    this.markers.push({
      position: {
        lat: 48.8615515,
        lng: 2.3112233
      },
      label: {
        color: "black",
        text: "Paris"
      }
    });
  }
}
