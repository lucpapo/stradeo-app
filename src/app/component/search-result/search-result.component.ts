import { Component } from '@angular/core';
import { ToolsComponent } from './tools/tools.component';
import { SettingsComponent } from './settings/settings.component';
import { AudiosComponent } from './audios/audios.component';
import { VideosComponent } from './videos/videos.component';
import { ImagesComponent } from './images/images.component';
import { AllComponent } from './all/all.component';
import { CommonModule } from '@angular/common';
import { FeatherIconComponent } from '../../shared/component/header/feather-icon/feather-icon.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent, CommonModule, AllComponent, 
      ImagesComponent, VideosComponent, AudiosComponent, 
      SettingsComponent, ToolsComponent,NgbNavModule]
})

export class SearchResultComponent {

  public active = 1;

}
