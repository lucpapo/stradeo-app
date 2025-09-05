import { Component } from '@angular/core';
import { popularTags, recentPosts, trendingPosts } from '../../../../shared/data/data/blog-data';
import { ClickOutsideDirective } from '../../../../shared/directive/outside.directive';

@Component({
    selector: 'app-blog-filter',
    templateUrl: './blog-filter.component.html',
    styleUrl: './blog-filter.component.scss',
    standalone: true,
    imports: [ClickOutsideDirective]
})

export class BlogFilterComponent {

  public isOpen : boolean = false;
  public trendingPosts = trendingPosts;
  public recentPosts = recentPosts;
  public popularTags = popularTags;


  outSide(){
     this.isOpen = false;
  }
}
