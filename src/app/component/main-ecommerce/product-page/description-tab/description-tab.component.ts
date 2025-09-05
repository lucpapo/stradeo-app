import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-description-tab',
  templateUrl: './description-tab.component.html',
  styleUrls: ['./description-tab.component.scss'],
  standalone: true,
  imports: [CommonModule, NgbNavModule]
})

export class DescriptionTabComponent {

  public active = 1;

}
