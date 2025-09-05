import { Component } from '@angular/core';
import { ScrollingContentComponent } from './scrolling-content/scrolling-content.component';
import { SimpleComponent } from './simple/simple.component';
import { TooltipsPopoversComponent } from './tooltips-popovers/tooltips-popovers.component';
import { OpenModalKabulComponent } from "./open-modal-kabul/open-modal-kabul.component";

@Component({
    selector: 'app-basic-modal',
    templateUrl: './basic-modal.component.html',
    styleUrls: ['./basic-modal.component.scss'],
    standalone: true,
    imports: [SimpleComponent, ScrollingContentComponent, TooltipsPopoversComponent, OpenModalKabulComponent]
})

export class BasicModalComponent {

}
