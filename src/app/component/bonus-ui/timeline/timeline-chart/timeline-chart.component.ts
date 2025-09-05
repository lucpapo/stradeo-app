import { Component } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { ResolutionsComponent } from './resolutions/resolutions.component';
import { MeetUpComponent } from './meet-up/meet-up.component';
import { AudioTestingComponent } from './audio-testing/audio-testing.component';

@Component({
    selector: 'app-timeline-chart',
    templateUrl: './timeline-chart.component.html',
    styleUrls: ['./timeline-chart.component.scss'],
    standalone: true,
    imports: [CarouselModule, AudioTestingComponent, MeetUpComponent, ResolutionsComponent]
})
export class TimelineChartComponent {

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
  }


}
