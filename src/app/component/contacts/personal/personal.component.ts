import { Component, Input, SimpleChanges } from '@angular/core';
import * as data from "../../../shared/data/data/all-contact";
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { CommonModule } from '@angular/common';

@Component({ 
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss'],
    standalone: true,
    imports: [CommonModule, ProfileDataComponent]
})
export class PersonalComponent {

  @Input() selectedId: number;
  @Input() statusData: boolean;
  @Input() getTitleData: string;
  
  public Personal = data.Personal;
  public organization = data.organization;
  public getTaskData: data.contactData;
  public lastData: data.lastDataList;
  public editContact: boolean = false;
  public open: boolean = false;
  public selectedItem: string | null = null;

  ngOnInit() {
    this.Personal.map((data) => {
      if (data.status) {
        this.getTaskData = data;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    let ipersnol_Id = changes['selectedId']?.currentValue;
    this.Personal.map((data) => {
      if (data.title_id === ipersnol_Id) {
        this.getTaskData = data;
      }
    })

    let getTitle = changes['getTitleData']?.currentValue;
    this.Personal.map((data) => {
      if (data.title === getTitle) {
        this.getTaskData = data;
      }
    })

    let organization_Id = changes['selectedId']?.currentValue;
    this.organization.map((data) => {
      if (data.title_id === organization_Id) {
        this.getTaskData = data;
      }
    })
  }

  changeData(list: data.lastDataList) {
    this.lastData = list;
    if (!list.status) {
      this.getTaskData.data.forEach((a: data.lastDataList) => {
        a.status = false;
      })
    }
    list.status = !list.status;
  }

  openHistory() {
    this.open = !this.open;
  }

}
