import { Component } from '@angular/core';
import { allData } from '../../../shared/data/data/search-result';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.scss'],
    standalone: true,
    imports: [NgbRating]
})
export class AllComponent {

  public allData = allData;

   constructor(public config: NgbRatingConfig){
    config.max = 5; config.readonly = true;
   }

}
