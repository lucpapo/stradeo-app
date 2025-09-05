import { Component, Input } from '@angular/core';
import { progress } from '../../../../shared/data/data/ui-kits/progress';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-common-progress-bar',
    templateUrl: './common-progress-bar.component.html',
    styleUrls: ['./common-progress-bar.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class CommonProgressBarComponent {

  @Input() data: progress[];

}
