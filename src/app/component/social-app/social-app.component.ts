import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutComponent } from "./about/about.component";
import { FriendsComponent } from "./friends/friends.component";
import { PhotosComponent } from "./photos/photos.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-social-app',
    templateUrl: './social-app.component.html',
    styleUrls: ['./social-app.component.scss'],
    standalone: true,
    imports: [CommonModule, TimelineComponent, AboutComponent, 
      FriendsComponent, PhotosComponent,NgbNavModule]
})

export class SocialAppComponent {

  public active = 1;

}
