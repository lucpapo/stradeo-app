import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-success-alert',
    templateUrl: './success-alert.component.html',
    styleUrls: ['./success-alert.component.scss'],
    standalone: true
})
export class SuccessAlertComponent {

  success() {
    Swal.fire({
      title: 'Good job!',
      text: 'You clicked the button!',
      icon: 'success',
      confirmButtonColor: 'var(--theme-default)',
    })
  }

}
