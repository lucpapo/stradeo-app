import { Component } from '@angular/core';
import { shapes } from '../../../../shared/data/data/ui-kits/avavtar';

@Component({
    selector: 'app-shapes',
    templateUrl: './shapes.component.html',
    styleUrls: ['./shapes.component.scss'],
    standalone: true
})
export class ShapesComponent {

  public shapesData = shapes;

}
