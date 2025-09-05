import { Component } from '@angular/core';
import { FontSizesComponent } from './font-sizes/font-sizes.component';
import { TextColorsComponent } from './text-colors/text-colors.component';
import { FontWeightComponent } from '../typography/font-weight/font-weight.component';
import { FontStyleComponent } from './font-style/font-style.component';
import { ImagesSizesComponent } from './images-sizes/images-sizes.component';
import { BorderColorComponent } from './border-color/border-color.component';
import { BackgroundColorsComponent } from './background-colors/background-colors.component';
import { BordersDisplaysComponent } from './borders-displays/borders-displays.component';
import { BorderStyleComponent } from './border-style/border-style.component';

@Component({
    selector: 'app-helper-classes',
    templateUrl: './helper-classes.component.html',
    styleUrls: ['./helper-classes.component.scss'],
    standalone: true,
    imports: [BorderStyleComponent, BordersDisplaysComponent, BackgroundColorsComponent, BorderColorComponent, ImagesSizesComponent, FontStyleComponent, FontWeightComponent, TextColorsComponent, FontSizesComponent]
})
export class HelperClassesComponent {





}
