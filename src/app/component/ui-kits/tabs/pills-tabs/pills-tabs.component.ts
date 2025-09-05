import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-pills-tabs',
    templateUrl: './pills-tabs.component.html',
    styleUrls: ['./pills-tabs.component.scss'],
    standalone: true,
    imports: [NgbNavModule]
})
export class PillsTabsComponent {

  public active = 3;

}
