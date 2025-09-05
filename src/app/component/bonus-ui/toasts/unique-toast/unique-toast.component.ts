import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-unique-toast',
    templateUrl: './unique-toast.component.html',
    styleUrls: ['./unique-toast.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class UniqueToastComponent {

  public Unique: boolean = true;

  close() {
    this.Unique = false;
  }

}
