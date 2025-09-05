import { Component } from '@angular/core';
import { Individual, IndividualOptions } from '../../../../shared/data/data/bonus-ui/owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-individual-interval',
    templateUrl: './individual-interval.component.html',
    styleUrl: './individual-interval.component.scss',
    standalone: true,
    imports: [CarouselModule]
})

export class IndividualIntervalComponent {

  public individual = Individual ;
  public individualOptions = IndividualOptions ;

}
