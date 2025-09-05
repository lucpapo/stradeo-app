import { Component } from '@angular/core';
import { smallProgressBar } from '../../../../shared/data/data/ui-kits/progress';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-small-progress-bars',
    templateUrl: './small-progress-bars.component.html',
    styleUrls: ['./small-progress-bars.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class SmallProgressBarsComponent {

  public smallProgressData = smallProgressBar;

}
