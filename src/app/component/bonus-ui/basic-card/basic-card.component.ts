import { Component } from '@angular/core';
import { CommonInfoCardComponent } from './common-info-card/common-info-card.component';
import { DarkCardComponent } from './dark-card/dark-card.component';
import { IconHeadingComponent } from './icon-heading/icon-heading.component';
import { WithoutShadowCardComponent } from './without-shadow-card/without-shadow-card.component';
import { FlatCardComponent } from './flat-card/flat-card.component';
import { SimpleCardComponent } from './simple-card/simple-card.component';

@Component({
    selector: 'app-basic-card',
    templateUrl: './basic-card.component.html',
    styleUrls: ['./basic-card.component.scss'],
    standalone: true,
    imports: [SimpleCardComponent, FlatCardComponent, WithoutShadowCardComponent, IconHeadingComponent, DarkCardComponent, CommonInfoCardComponent]
})
export class BasicCardComponent {

}
