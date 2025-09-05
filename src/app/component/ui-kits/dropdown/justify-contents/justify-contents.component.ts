import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import * as Data from '../../../../shared/data/data/ui-kits/dropdown';

@Component({
    selector: 'app-justify-contents',
    templateUrl: './justify-contents.component.html',
    styleUrls: ['./justify-contents.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})
export class JustifyContentsComponent {

  public justifyData = Data.justifyContents;

}
