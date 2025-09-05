import { Component } from '@angular/core';
import { additionalContent } from '../../../../shared/data/data/ui-kits/alert';

@Component({
    selector: 'app-additional-content',
    templateUrl: './additional-content.component.html',
    styleUrls: ['./additional-content.component.scss'],
    standalone: true
})
export class AdditionalContentComponent {

  public additionalData = additionalContent;

}
