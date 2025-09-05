import { Component, Input } from '@angular/core';
import { articlesAndVideos } from '../../../shared/data/data/faq';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-latest-article-videos',
    templateUrl: './latest-article-videos.component.html',
    styleUrls: ['./latest-article-videos.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})

export class LatestArticleVideosComponent {

  @Input() data: articlesAndVideos[];

}
