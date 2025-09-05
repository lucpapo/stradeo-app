import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-vertical-tabs',
    templateUrl: './vertical-tabs.component.html',
    styleUrls: ['./vertical-tabs.component.scss'],
    standalone: true,
    imports: [NgbNavModule]
})
export class VerticalTabsComponent {

  public active = 2;

}
