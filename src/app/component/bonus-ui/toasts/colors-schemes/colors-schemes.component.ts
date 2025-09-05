import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-colors-schemes',
    templateUrl: './colors-schemes.component.html',
    styleUrls: ['./colors-schemes.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class ColorsSchemesComponent {

  public colorThemes: boolean = true;

  close() {
    this.colorThemes = false;
  }

}
