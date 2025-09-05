import { Component } from '@angular/core';

@Component({
    selector: 'app-horizontal-accordion',
    templateUrl: './horizontal-accordion.component.html',
    styleUrls: ['./horizontal-accordion.component.scss'],
    standalone: true
})
export class HorizontalAccordionComponent {

  public togglecollpese = false;

  onClick() {
    this.togglecollpese = !this.togglecollpese;
  }

}
