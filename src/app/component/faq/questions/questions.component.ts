import { Component } from '@angular/core';
import { NgbAccordionConfig, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';
import { questionData } from '../../../shared/data/data/faq';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule,FeatherIconComponent]
})
export class QuestionsComponent {

  public questionData = questionData;

  constructor(config: NgbAccordionConfig) {
		config.closeOthers = true;
  }	
}
