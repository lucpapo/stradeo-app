import { Component } from '@angular/core';
import { articlesAndVideosData, featuredTutorialData, knowledgeBaseData } from '../../shared/data/data/knowledge-base';
import { LatestArticleVideosComponent } from '../faq/latest-article-videos/latest-article-videos.component';
import { FeaturedTutorialsComponent } from '../faq/featured-tutorials/featured-tutorials.component';
import { BrowseArticleCategoriesComponent } from './browse-article-categories/browse-article-categories.component';
import { knowledgeBaseTopDataComponent } from './knowledgeBase-top-data/knowledgeBase-top-data.component';
import { FeatherIconComponent } from '../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-knowledgeBase',
    templateUrl: './knowledgeBase.component.html',
    styleUrls: ['./knowledgeBase.component.scss'],
    standalone: true,
    imports: [knowledgeBaseTopDataComponent, FeatherIconComponent, 
      BrowseArticleCategoriesComponent, FeaturedTutorialsComponent, 
      LatestArticleVideosComponent]
})

export class KnowledgeBaseComponent {

  public featuredTutorialData = featuredTutorialData;
  public articlesAndVideosData = articlesAndVideosData;
  public knowledgeBaseData = knowledgeBaseData;

}
