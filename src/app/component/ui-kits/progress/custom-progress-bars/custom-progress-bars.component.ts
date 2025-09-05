import { Component } from '@angular/core';
import { customProgressBar } from '../../../../shared/data/data/ui-kits/progress';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-custom-progress-bars',
    templateUrl: './custom-progress-bars.component.html',
    styleUrls: ['./custom-progress-bars.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class CustomProgressBarsComponent {

  public customProgressData = customProgressBar;

}
