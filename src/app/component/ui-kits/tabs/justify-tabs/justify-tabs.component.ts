import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { iOTdeveloper, uxDesigner, webDesigner } from '../../../../shared/data/data/ui-kits/tab';

@Component({
    selector: 'app-justify-tabs',
    templateUrl: './justify-tabs.component.html',
    styleUrls: ['./justify-tabs.component.scss'],
    standalone: true,
    imports: [NgbNavModule]
})
export class JustifyTabsComponent {

  public active = 2;
  public webDesignerData = webDesigner;
  public UXDesignerData = uxDesigner;
  public iotDeveloperData = iOTdeveloper;

}
  