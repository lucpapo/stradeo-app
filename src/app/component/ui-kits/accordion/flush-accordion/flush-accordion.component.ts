import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { flushAccordion } from '../../../../shared/data/data/ui-kits/accordion';

@Component({
    selector: 'app-flush-accordion',
    templateUrl: './flush-accordion.component.html',
    styleUrls: ['./flush-accordion.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule]
})
export class FlushAccordionComponent {

  public flushAccordionData = flushAccordion;

}
