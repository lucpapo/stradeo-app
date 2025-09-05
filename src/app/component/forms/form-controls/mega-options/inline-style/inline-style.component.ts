import { Component } from '@angular/core';
import { inlineStyle } from '../../../../../shared/data/data/forms/form-controls/mega-options';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-inline-style',
    templateUrl: './inline-style.component.html',
    styleUrls: ['./inline-style.component.scss'],
    standalone: true,
    imports: [FormsModule]
})
export class InlineStyleComponent {

  public inlineData = inlineStyle;

}
