import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-default-toast',
    templateUrl: './default-toast.component.html',
    styleUrls: ['./default-toast.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class DefaultToastComponent {

  public default: boolean = true;

  close() {
    this.default = false;
  }

}
