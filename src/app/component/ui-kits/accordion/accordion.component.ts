import { Component } from '@angular/core';
import { CollapseAccordionComponent } from './collapse-accordion/collapse-accordion.component';
import { HorizontalAccordionComponent } from './horizontal-accordion/horizontal-accordion.component';
import { OutlineAccordionComponent } from './outline-accordion/outline-accordion.component';
import { IconsAccordionComponent } from './icons-accordion/icons-accordion.component';
import { MultipleCollapseAccordionComponent } from './multiple-collapse-accordion/multiple-collapse-accordion.component';
import { FlushAccordionComponent } from './flush-accordion/flush-accordion.component';
import { SimpleAccordionComponent } from './simple-accordion/simple-accordion.component';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    standalone: true,
    imports: [SimpleAccordionComponent, FlushAccordionComponent, MultipleCollapseAccordionComponent, IconsAccordionComponent, OutlineAccordionComponent, HorizontalAccordionComponent, CollapseAccordionComponent]
})
export class AccordionComponent {

}
