import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-material-style-left-tabs',
    templateUrl: './material-style-left-tabs.component.html',
    styleUrls: ['./material-style-left-tabs.component.scss'],
    standalone: true,
    imports: [NgbNavModule]
})
export class MaterialStyleLeftTabsComponent {

  public active = 1;

}
