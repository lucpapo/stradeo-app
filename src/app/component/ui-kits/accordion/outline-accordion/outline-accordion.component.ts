import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { outlineAccordion } from '../../../../shared/data/data/ui-kits/accordion';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';

@Component({
    selector: 'app-outline-accordion',
    templateUrl: './outline-accordion.component.html',
    styleUrls: ['./outline-accordion.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule,FeatherIconComponent]
})
export class OutlineAccordionComponent {

  public outlineAccordionData = outlineAccordion;

}
