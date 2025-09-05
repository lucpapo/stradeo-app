import { Routes } from '@angular/router';
import { FlagIconsComponent } from './flag-icons/flag-icons.component';
import { FontAwesomeComponent } from './font-awesome/font-awesome.component';
import { IcoIconComponent } from './ico-icon/ico-icon.component';
import { ThemifyIconComponent } from './themify-icon/themify-icon.component';
import { WeatherIconsComponent } from './weather-icons/weather-icons.component';
import { FeatherIconsComponent } from './feather-icons/feather-icons.component';

export default [
  {
    path: 'flag-icons',
    component: FlagIconsComponent,
    data: {
      title: "flag icons",
      breadcrumb: "flag icons",
    }
  },
  {
    path: 'fontawesome',
    component: FontAwesomeComponent,
    data: {
      title: "Font Awesome Icon",
      breadcrumb: "Font Awesome Icon",
    }
  },
  {
    path: 'ico-icons',
    component: IcoIconComponent,
    data: {
      title: "ICO Icon",
      breadcrumb: "ICO Icon",
    }
  },
  {
    path: 'feather-icons',
    component: FeatherIconsComponent,
    data: {
      title: "Feather Icons",
      breadcrumb: "Feather Icons",
    }
  },
  {
    path: 'themify-icons',
    component: ThemifyIconComponent,
    data: {
      title: "Themify Icon",
      breadcrumb: "Themify Icon",
    }
  },
  {
    path: 'weather-icons',
    component: WeatherIconsComponent,
    data: {
      title: "Weather Icon",
      breadcrumb: "Weather Icon",
    }
  },
] as Routes;
