import { Component, Input } from '@angular/core';
import { hobbiesEduction } from '../../../../../shared/data/data/social-media-data';

@Component({
    selector: 'app-hobbies-eduction',
    templateUrl: './hobbies-eduction.component.html',
    styleUrls: ['./hobbies-eduction.component.scss'],
    standalone: true
})
export class HobbiesEductionComponent {

  @Input() data: hobbiesEduction;

}
