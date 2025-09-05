import { Routes } from '@angular/router';
import { GoogleMapComponent } from './google-map/google-map.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

export default [
  {
    path: 'google-map',
    component: GoogleMapComponent,
    data: {
      title: 'Google Map',
      breadcrumb: 'Google Map'
    }
  },
  {
    path: 'leaflet-map',
    component: LeafletMapComponent,
    data: {
      title: 'Leaflet Map',
      breadcrumb: 'Leaflet Map'
    }
  }
] as Routes;