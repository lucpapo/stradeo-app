
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-info-alert',
    templateUrl: './info-alert.component.html',
    styleUrls: ['./info-alert.component.scss'],
    standalone: true
})
export class InfoAlertComponent {

  info() {
    Swal.fire({
      text: "Please Click on this button it's big surprise for you.",
      confirmButtonColor: 'var(--theme-default)',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'Thank you for visit Kabul theme: true',
          confirmButtonColor: 'var(--theme-default)',
        },
        )
      }
    })
  }

}
