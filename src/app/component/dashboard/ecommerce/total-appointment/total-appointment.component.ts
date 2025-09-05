import { Component } from '@angular/core';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import * as data from '../../../../shared/data/data/dashboard';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-total-appointment',
  standalone: true,
  imports: [DropdownComponent,RouterModule],
  templateUrl: './total-appointment.component.html',
  styleUrl: './total-appointment.component.scss'
})

export class TotalAppointmentComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
   public totalAppointment = data.totalAppointment ; 
}
