import { Component } from '@angular/core';
import { SmallModalComponent } from './small-modal/small-modal.component';
import { LargeModalComponent } from './large-modal/large-modal.component';
import { ExtraLargeModalComponent } from './extra-large-modal/extra-large-modal.component';
import { FullScreenModalComponent } from './full-screen-modal/full-screen-modal.component';

@Component({
    selector: 'app-sizes-modal',
    templateUrl: './sizes-modal.component.html',
    styleUrls: ['./sizes-modal.component.scss'],
    standalone: true,
    imports: [FullScreenModalComponent, ExtraLargeModalComponent, LargeModalComponent, SmallModalComponent]
})
export class SizesModalComponent {

}
