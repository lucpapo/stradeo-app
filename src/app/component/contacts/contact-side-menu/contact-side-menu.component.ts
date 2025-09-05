import { Component, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';
import * as data from '../../../shared/data/data/all-contact';
import { AddCategoryComponent } from '../contact-modal/add-category/add-category.component';
import { NewContactComponent } from '../contact-modal/new-contact/new-contact.component';
import { PersonalComponent } from '../personal/personal.component';
import { ClickOutsideDirective } from '../../../shared/directive/outside.directive';

@Component({
    selector: 'app-contact-side-menu',
    templateUrl: './contact-side-menu.component.html',
    styleUrls: ['./contact-side-menu.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent, PersonalComponent,NewContactComponent,AddCategoryComponent,ClickOutsideDirective]
})
export class ContactSideMenuComponent {

  @Output() selectedId: number;
  @Output() statusData: boolean;
  @Output() getTitleData: string;
  @Output() titleData: string;
  
  public Personal = data.Personal;
  public organization = data.organization;
  public viewList = data.viewList;
  public open: boolean = false;
  public lastData: data.lastDataList;

  constructor(private modalService: NgbModal) { }
  
  ngOnInit(changes: SimpleChanges) {
    let getStatusData = this.Personal.filter((data) => {
      return data.status == true;
    })
    this.statusData = getStatusData[0]?.status;
  }

  newContacts() {
    const model = this.modalService.open(NewContactComponent, { size: 'lg' });
  }

  addCategory() {
    const model = this.modalService.open(AddCategoryComponent, { size: 'SM' });
  }

  changeData(list: number, title: string) {
    const getId = this.Personal.filter(x => x.title_id == list);
    this.selectedId = getId[0].title_id;
    const getTitleData = this.Personal.filter(x => x.title = title);
    this.titleData = getTitleData[0].title;
  }

  changeData1(list: number , title:string) {
    const getId = this.organization.filter(x => x.title_id == list);
    this.selectedId = getId[0].title_id;
    const getTitleData = this.organization.filter(x => x.title = title);
    this.titleData = getTitleData[0].title;
  }

  openMenu() {
    this.open = !this.open;
  }

}
