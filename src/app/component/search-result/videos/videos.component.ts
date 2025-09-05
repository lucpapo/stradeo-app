import { Component } from '@angular/core';
import * as Data from '../../../shared/data/data/search-result';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss'],
    standalone: true
})
export class VideosComponent {

  public videosData = Data.videosData;

  constructor(public sanitizer: DomSanitizer) { }


  safe(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
