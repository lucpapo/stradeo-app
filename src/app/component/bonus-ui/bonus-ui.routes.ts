import { Routes } from '@angular/router';
import { BasicCardComponent } from './basic-card/basic-card.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CreativeCardComponent } from './creative-card/creative-card.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { ImageCropComponent } from './image-cropper/image-cropper.component';
import { OwlCarouselComponent } from './owl-carousel/owl-carousel.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { RatingComponent } from './rating/rating.component';
import { RibbonsComponent } from './ribbons/ribbons.component';
import { SweetAlertTwoComponent } from './sweet-alert-two/sweet-alert-two.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ToastsComponent } from './toasts/toasts.component';

export default  [
      {
        path: 'toasts',
        component: ToastsComponent,
        data: {
          title: "Toasts",
          breadcrumb: "Toasts",
        }
      },
      {
        path: 'rating',
        component: RatingComponent,
        data: {
          title: "Rating",
          breadcrumb: "Rating",
        }
      },
      {
        path: 'dropzone',
        component: DropzoneComponent,
        data: {
          title: "Dropzone",
          breadcrumb: "Dropzone",
        }
      },
      {
        path: 'sweetalert2',
        component: SweetAlertTwoComponent,
        data: {
          title: "Sweet Alert",
          breadcrumb: "Sweet Alert",
        }
      },
      {
        path: 'owl-carousel',
        component: OwlCarouselComponent,
        data: {
          title: "Owl Carousel",
          breadcrumb: "Owl Carousel",
        }
      },
      {
        path: 'ribbons',
        component: RibbonsComponent,
        data: {
          title: "Ribbons",
          breadcrumb: "Ribbons",
        }
      },
      {
        path: 'pagination',
        component: PaginationComponent,
        data: {
          title: "Paginations",
          breadcrumb: "Paginations",
        }
      },
      {
        path: 'breadcrumb-ui',
        component: BreadcrumbComponent,
        data: {
          title: "Breadcrumb",
          breadcrumb: "Breadcrumb",
        }
      },
      {
        path: 'range-slider',
        component: RangeSliderComponent,
        data: {
          title: "Range Slider",
          breadcrumb: "Range Slider",
        }
      },
      {
        path: 'image-cropper',
        component: ImageCropComponent,
        data: {
          title: "Image Cropper",
          breadcrumb: "Image Cropper",
        }
      },
      {
        path: 'basic-card',
        component: BasicCardComponent,
        data: {
          title: "Basic Card",
          breadcrumb: "Basic Card",
        }
      },
      {
        path: 'creative-card',
        component: CreativeCardComponent,
        data: {
          title: "Creative Card",
          breadcrumb: "Creative Card",
        }
      },
      {
        path: 'timeline',
        component: TimelineComponent,
        data: {
          title: "Timeline",
          breadcrumb: "Timeline",
        }
      }
    
] as Routes; 

