import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AllComponent } from "./all/all.component";
import { FollowingComponent } from "./following/following.component";
import { ArchiveComponent } from "./archive/archive.component";
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [NgbNavModule, AllComponent, FollowingComponent, ArchiveComponent, DropdownComponent],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})

export class InformationComponent {

  public active = 1; 
  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];

}
