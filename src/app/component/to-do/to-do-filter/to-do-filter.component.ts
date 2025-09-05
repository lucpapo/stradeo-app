import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';
import { ClickOutsideDirective } from '../../../shared/directive/outside.directive';

@Component({
    selector: 'app-to-do-filter',
    templateUrl: './to-do-filter.component.html',
    styleUrls: ['./to-do-filter.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, FeatherIconComponent]
})
export class ToDoFilterComponent {

  public open: boolean = false;

  openFilter() {
    this.open = !this.open
  }

  clickOutside():void { 
    this.open = false;
  }

}
