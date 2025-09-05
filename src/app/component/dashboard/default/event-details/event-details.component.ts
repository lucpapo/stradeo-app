import { Component } from '@angular/core';
import * as data from "../../../../shared/data/data/dashboard";
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import { CommonSvgIconsComponent } from "../../../../shared/component/header/common-svg-icons/common-svg-icons.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [DropdownComponent, CommonSvgIconsComponent,CommonModule,RouterModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})

export class EventDetailsComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];

  public tableData = data.eventDetails;


}
