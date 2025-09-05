import { Component } from '@angular/core';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { VerticalStyle } from '../../../../../shared/data/data/forms/form-controls/mega-options';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-vertical-style',
    templateUrl: './vertical-style.component.html',
    styleUrls: ['./vertical-style.component.scss'],
    standalone: true,
    imports: [FormsModule, NgbRating]
})
export class VerticalStyleComponent {

  public verticalStyleData = VerticalStyle;

  constructor(public rating:NgbRatingConfig){
    rating.max = 5,
    rating.readonly = true;
   }

}
