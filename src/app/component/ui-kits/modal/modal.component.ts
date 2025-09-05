import { Component } from '@angular/core';
import { CustomModalsComponent } from './custom-modals/custom-modals.component';
import { StaticBackdropModalComponent } from './static-backdrop-modal/static-backdrop-modal.component';
import { ToggleBetweenModalsComponent } from './toggle-between-modals/toggle-between-modals.component';
import { CenteredModalComponent } from './centered-modal/centered-modal.component';
import { FullscreenModalComponent } from './fullscreen-modal/fullscreen-modal.component';
import { SizesModalComponent } from './sizes-modal/sizes-modal.component';
import { BasicModalComponent } from './basic-modal/basic-modal.component';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: true,
    imports: [BasicModalComponent, SizesModalComponent, FullscreenModalComponent, CenteredModalComponent, ToggleBetweenModalsComponent, StaticBackdropModalComponent, CustomModalsComponent]
})
export class ModalComponent {

}
