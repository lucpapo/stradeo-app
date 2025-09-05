import { Component } from '@angular/core';
import { FaqTopPartData, articlesAndVideosData, featuredTutorialData } from '../../shared/data/data/faq';
import { LatestArticleVideosComponent } from './latest-article-videos/latest-article-videos.component';
import { FeaturedTutorialsComponent } from './featured-tutorials/featured-tutorials.component';
import { LatestUpdateComponent } from './latest-update/latest-update.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchArticleComponent } from './search-article/search-article.component';
import { QuestionsComponent } from './questions/questions.component';
import { FeatherIconComponent } from '../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent, QuestionsComponent, 
      SearchArticleComponent, NavigationComponent, 
      LatestUpdateComponent, FeaturedTutorialsComponent, 
      LatestArticleVideosComponent]
})

export class FaqComponent {

  public FaqTopPartData = FaqTopPartData;
  public featuredTutorialData = featuredTutorialData;
  public articlesAndVideosData = articlesAndVideosData;

}
