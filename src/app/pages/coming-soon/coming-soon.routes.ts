import { Routes } from '@angular/router';
import { ComingSimpleComponent } from './coming-simple/coming-simple.component';
import { ComingWithBgImageComponent } from './coming-with-bg-image/coming-with-bg-image.component';
import { ComingWithBgVideoComponent } from './coming-with-bg-video/coming-with-bg-video.component';

export default  [
      {
        path: 'coming-soon-simple',
        component: ComingSimpleComponent
      },
      {
        path: 'coming-soon-video',
        component: ComingWithBgVideoComponent
      },
      {
        path: 'coming-soon-image',
        component: ComingWithBgImageComponent
      },
] as Routes; 
