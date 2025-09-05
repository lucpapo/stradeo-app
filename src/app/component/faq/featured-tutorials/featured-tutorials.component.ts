import { Component, Input } from '@angular/core';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { featuredTutorial } from '../../../shared/data/data/faq';

@Component({
    selector: 'app-featured-tutorials',
    templateUrl: './featured-tutorials.component.html',
    styleUrls: ['./featured-tutorials.component.scss'],
    standalone: true,
    imports: [NgbRating]
})

export class FeaturedTutorialsComponent {

  @Input() data : featuredTutorial[];

  constructor(public config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

}
