import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../../shared/component/header/feather-icon/feather-icon.component';
import { iconsAccordion } from '../../../../shared/data/data/ui-kits/accordion';

@Component({
    selector: 'app-icons-accordion',
    templateUrl: './icons-accordion.component.html',
    styleUrls: ['./icons-accordion.component.scss'],
    standalone: true,
    imports: [NgbAccordionModule,FeatherIconComponent]
})
export class IconsAccordionComponent {

  public iconAccordionData = iconsAccordion;

}
