import { Component } from '@angular/core';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { HorizontalStyle } from '../../../../../shared/data/data/forms/form-controls/mega-options';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-horizontal-style',
    templateUrl: './horizontal-style.component.html',
    styleUrls: ['./horizontal-style.component.scss'],
    standalone: true,
    imports: [FormsModule, NgbRating]
})
export class HorizontalStyleComponent {

  public horizontalStyleData = HorizontalStyle;

  constructor(public rating:NgbRatingConfig){
    rating.max = 5,
    rating.readonly = true;
   }

}
