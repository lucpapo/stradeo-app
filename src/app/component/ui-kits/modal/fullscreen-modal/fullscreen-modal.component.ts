import { Component } from '@angular/core';
import { FullscreenBelowXxlModalComponent } from './fullscreen-below-xxl-modal/fullscreen-below-xxl-modal.component';
import { FullscreenBelowXlModalComponent } from './fullscreen-below-xl-modal/fullscreen-below-xl-modal.component';
import { FullscreenBelowLgModalComponent } from './fullscreen-below-lg-modal/fullscreen-below-lg-modal.component';
import { FullscreenBelowMdModalComponent } from './fullscreen-below-md-modal/fullscreen-below-md-modal.component';
import { FullscreenBelowSmModalComponent } from './fullscreen-below-sm-modal/fullscreen-below-sm-modal.component';
import { FullscreenUiModalComponent } from './fullscreen-ui-modal/fullscreen-ui-modal.component';

@Component({
    selector: 'app-fullscreen-modal',
    templateUrl: './fullscreen-modal.component.html',
    styleUrls: ['./fullscreen-modal.component.scss'],
    standalone: true,
    imports: [FullscreenUiModalComponent, FullscreenBelowSmModalComponent, FullscreenBelowMdModalComponent, FullscreenBelowLgModalComponent, FullscreenBelowXlModalComponent, FullscreenBelowXxlModalComponent]
})
export class FullscreenModalComponent {

}
