import { Component } from '@angular/core';
import { DefaultButtons, styleButton } from '../../../shared/data/data/buttons/default-style';

@Component({
    selector: 'app-default-style',
    templateUrl: './default-style.component.html',
    styleUrls: ['./default-style.component.scss'],
    standalone: true
})
export class DefaultStyleComponent {

  public defaultStyleData = DefaultButtons;
  public styleButtonData = styleButton;

}
