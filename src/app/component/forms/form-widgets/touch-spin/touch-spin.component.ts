import { Component } from '@angular/core';
import { RoundedTouchSpinComponent } from './rounded-touch-spin/rounded-touch-spin.component';
import { ButtonsWithPrefixPostfixComponent } from './buttons-with-prefix-postfix/buttons-with-prefix-postfix.component';
import { IconsWithPrefixPostfixComponent } from './icons-with-prefix-postfix/icons-with-prefix-postfix.component';
import { OutlinedTouchSpinComponent } from './outlined-touch-spin/outlined-touch-spin.component';
import { DefaultTouchSpinComponent } from './default-touch-spin/default-touch-spin.component';

@Component({
    selector: 'app-touch-spin',
    templateUrl: './touch-spin.component.html',
    styleUrls: ['./touch-spin.component.scss'],
    standalone: true,
    imports: [DefaultTouchSpinComponent, OutlinedTouchSpinComponent, IconsWithPrefixPostfixComponent, ButtonsWithPrefixPostfixComponent, RoundedTouchSpinComponent]
})
export class TouchSpinComponent {

}
