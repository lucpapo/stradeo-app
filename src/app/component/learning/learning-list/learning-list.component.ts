import { Component } from '@angular/core';
import { learningTopData, learningData } from '../../../shared/data/data/learning';
import { LearningFilterComponent } from '../learning-filter/learning-filter.component';

@Component({
    selector: 'app-learning-list',
    templateUrl: './learning-list.component.html',
    styleUrls: ['./learning-list.component.scss'],
    standalone: true,
    imports: [LearningFilterComponent]
})
export class LearningListComponent {

  public learningTopData = learningTopData;
  public learningData = learningData;

}
