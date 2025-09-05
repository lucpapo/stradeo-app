import { Component } from '@angular/core';
import { caption } from '../../../../../shared/data/data/table/bootstrap-table/basic-tables';

@Component({
    selector: 'app-caption',
    templateUrl: './caption.component.html',
    styleUrls: ['./caption.component.scss'],
    standalone: true
})
export class CaptionComponent {

  public captionData = caption;

}
