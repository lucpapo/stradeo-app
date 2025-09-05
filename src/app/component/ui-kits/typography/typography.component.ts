import { Component } from '@angular/core';
import { BlockQuotesComponent } from './block-quotes/block-quotes.component';
import { TextColorComponent } from './text-color/text-color.component';
import { InlineTextElementsComponent } from './inline-text-elements/inline-text-elements.component';
import { DisplayHeadingsComponent } from './display-headings/display-headings.component';
import { ListingTypographyComponent } from './listing-typography/listing-typography.component';
import { FontWeightComponent } from './font-weight/font-weight.component';
import { ColoredHeadingsComponent } from './colored-headings/colored-headings.component';
import { HeadingsComponent } from './headings/headings.component';

@Component({
    selector: 'app-typography',
    templateUrl: './typography.component.html',
    styleUrls: ['./typography.component.scss'],
    standalone: true,
    imports: [HeadingsComponent, ColoredHeadingsComponent, FontWeightComponent, 
        ListingTypographyComponent, DisplayHeadingsComponent, InlineTextElementsComponent, 
        TextColorComponent, BlockQuotesComponent]
})
export class TypographyComponent {

}
