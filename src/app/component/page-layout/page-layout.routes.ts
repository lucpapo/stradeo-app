import { Routes } from '@angular/router';
import { FooterDarkComponent } from './footer-dark/footer-dark.component';
import { FooterFixedComponent } from './footer-fixed/footer-fixed.component';
import { FooterLightComponent } from './footer-light/footer-light.component';
import { HideScrollNavComponent } from './hide-scroll-nav/hide-scroll-nav.component';

export default [
  {
    path: 'hide-nav-scroll',
    component: HideScrollNavComponent,
    data: {
      title: 'Hide Menu On Scroll',
      breadcrumb: 'Hide Menu On Scroll',
    }
  },
  {
    path: 'footer-dark',
    component: FooterDarkComponent,
    data: {
      title: 'Footer Dark',
      breadcrumb: 'Footer Dark',
    }
  },
  {
    path: 'footer-light',
    component: FooterLightComponent,
    data: {
      title: 'Footer Light',
      breadcrumb: 'Footer Light',
    }
  },
  {
    path: 'footer-fixed',
    component: FooterFixedComponent,
    data: {
      title: 'Footer Fixed',
      breadcrumb: 'Footer Fixed',
    }
  },
] as Routes

