import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-icons-tabs',
    templateUrl: './icons-tabs.component.html',
    styleUrls: ['./icons-tabs.component.scss'],
    standalone: true,
    imports: [NgbNavModule]
})
export class IconsTabsComponent {

  public active = 1;

}
