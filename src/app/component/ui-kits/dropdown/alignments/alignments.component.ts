import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import * as Data from '../../../../shared/data/data/ui-kits/dropdown';

@Component({
    selector: 'app-alignments',
    templateUrl: './alignments.component.html',
    styleUrls: ['./alignments.component.scss'],
    standalone: true,
    imports: [NgbDropdownModule]
})
export class AlignmentsComponent {

  public alignmentsDropdownData = Data.alignmentsDropdown;

}
