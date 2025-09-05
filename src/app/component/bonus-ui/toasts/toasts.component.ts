import { Component } from '@angular/core';
import { UniqueToastComponent } from './unique-toast/unique-toast.component';
import { DefaultToastComponent } from './default-toast/default-toast.component';
import { TranslucentToastsComponent } from './translucent-toasts/translucent-toasts.component';
import { StackingToastsComponent } from './stacking-toasts/stacking-toasts.component';
import { ColorsSchemesComponent } from './colors-schemes/colors-schemes.component';
import { LiveToastComponent } from './live-toast/live-toast.component';

@Component({
    selector: 'app-toasts',
    templateUrl: './toasts.component.html',
    styleUrls: ['./toasts.component.scss'],
    standalone: true,
    imports: [LiveToastComponent, ColorsSchemesComponent, StackingToastsComponent, TranslucentToastsComponent, DefaultToastComponent, UniqueToastComponent]
})
export class ToastsComponent {

}
