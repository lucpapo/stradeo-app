import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-simple-tabs',
    templateUrl: './simple-tabs.component.html',
    styleUrls: ['./simple-tabs.component.scss'],
    standalone: true,
    imports: [NgbNavModule]
})
export class SimpleTabsComponent {

  public active = 2;

}
