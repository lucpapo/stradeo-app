import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-border-tabs',
    templateUrl: './border-tabs.component.html',
    styleUrls: ['./border-tabs.component.scss'],
    standalone: true,
    imports: [NgbNavModule]
})
export class BorderTabsComponent {

  public active = 2;

}
