import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-java-script-behavior',
    templateUrl: './java-script-behavior.component.html',
    styleUrls: ['./java-script-behavior.component.scss'],
    standalone: true,
    imports: [NgbNavModule]
})
export class JavaScriptBehaviorComponent {

  public active = 1;


}
