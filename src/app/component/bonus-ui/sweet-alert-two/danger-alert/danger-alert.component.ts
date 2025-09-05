import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-danger-alert',
    templateUrl: './danger-alert.component.html',
    styleUrls: ['./danger-alert.component.scss'],
    standalone: true
})
export class DangerAlertComponent {

  danger() {
    Swal.fire({
      title: "It's danger",
      text: 'Something went wrong!',
      icon: 'error',
      confirmButtonColor: 'var(--theme-default)',
    })
  }

}
