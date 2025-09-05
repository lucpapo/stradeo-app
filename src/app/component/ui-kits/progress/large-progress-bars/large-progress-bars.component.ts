import { Component } from '@angular/core';
import { largeProgressBar } from '../../../../shared/data/data/ui-kits/progress';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-large-progress-bars',
    templateUrl: './large-progress-bars.component.html',
    styleUrls: ['./large-progress-bars.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class LargeProgressBarsComponent {

  public largeProgressData = largeProgressBar;


}
