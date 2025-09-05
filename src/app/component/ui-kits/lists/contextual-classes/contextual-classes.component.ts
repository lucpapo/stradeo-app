import { Component } from '@angular/core';
import { contextualClasses } from '../../../../shared/data/data/ui-kits/lists';

@Component({
    selector: 'app-contextual-classes',
    templateUrl: './contextual-classes.component.html',
    styleUrls: ['./contextual-classes.component.scss'],
    standalone: true
})

export class ContextualClassesComponent {

  public contextualData = contextualClasses;

}
