import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-basic-example',
    templateUrl: './basic-example.component.html',
    styleUrls: ['./basic-example.component.scss'],
    standalone: true
})
export class BasicExampleComponent {

  basicAlert() {
    Swal.fire({
      title: 'Welcome! to the  theme',
      confirmButtonColor: 'var(--theme-default)',
    })
  }

}
