import { Component } from '@angular/core';
import { blogGrid, blogGrids, latestNewsAndTrends } from '../../../shared/data/data/blog-data';
import { BlogFilterComponent } from '../widgets/blog-filter/blog-filter.component';
import { RouterLink } from '@angular/router';
import { CommonSvgIconsComponent } from '../../../shared/component/header/common-svg-icons/common-svg-icons.component';

@Component({
    selector: 'app-blog-grids',
    templateUrl: './blog-grids.component.html',
    styleUrl: './blog-grids.component.scss',
    standalone: true,
    imports: [RouterLink, CommonSvgIconsComponent, BlogFilterComponent]
})

export class BlogGridsComponent {

  public blogGrids = blogGrids;
  public latestNewsAndTrends = latestNewsAndTrends;

  liked(value:blogGrid) {
    return value.like = !value.like;
  }

}
