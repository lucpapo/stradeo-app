import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { simpleAccordion } from '../../../../shared/data/data/ui-kits/accordion';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-simple-accordion',
    templateUrl: './simple-accordion.component.html',
    styleUrls: ['./simple-accordion.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule,FeatherIconComponent]
})

export class SimpleAccordionComponent {

  public simpleAccordionData = simpleAccordion;

}
