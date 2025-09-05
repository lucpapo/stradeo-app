import { Component } from '@angular/core';
import { browseArticlesData } from '../../../shared/data/data/knowledge-base';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-browse-article-categories',
    templateUrl: './browse-article-categories.component.html',
    styleUrls: ['./browse-article-categories.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})

export class BrowseArticleCategoriesComponent {

  public browseArticlesData = browseArticlesData;

}
