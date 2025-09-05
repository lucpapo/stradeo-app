import { Component } from '@angular/core';
import { wordTreeChart } from '../../../../shared/data/chart/google-chart';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
    selector: 'app-word-tree',
    templateUrl: './word-tree.component.html',
    styleUrl: './word-tree.component.scss',
    standalone: true,
    imports: [Ng2GoogleChartsModule]
})

export class WordTreeComponent {

  public wordTreeChart = wordTreeChart;

}
