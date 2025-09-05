import { Component } from '@angular/core';
import { TextColors } from '../../../../shared/data/data/ui-kits/helper-classes';

@Component({
    selector: 'app-text-colors',
    templateUrl: './text-colors.component.html',
    styleUrls: ['./text-colors.component.scss'],
    standalone: true
})
export class TextColorsComponent {

  public TextColorData = TextColors;

}
