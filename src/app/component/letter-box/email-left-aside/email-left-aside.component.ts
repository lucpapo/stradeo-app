import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as data from "../../../shared/data/data/letter-box";
import { EmailContentComponent } from "../email-content/email-content.component";
import { AddLabelComponent } from "../model/add-label/add-label.component";
import { ComposeEmailComponent } from "../model/compose-email/compose-email.component";
import { ClickOutsideDirective } from "../../../shared/directive/outside.directive";
import { CommonSvgIconsComponent } from "../../../shared/component/header/common-svg-icons/common-svg-icons.component";

@Component({
    selector: "app-email-left-aside",
    templateUrl: "./email-left-aside.component.html",
    styleUrls: ["./email-left-aside.component.scss"],
    standalone: true,
    imports: [
        ClickOutsideDirective,
        CommonModule,
        CommonSvgIconsComponent,
        EmailContentComponent,
    ],
})
export class EmailLeftAsideComponent {

  public emailFilter = data.emailFilter;
  public selectedId : number;
  public status : number;
  public isOpen : boolean =  false;

  constructor(private modal: NgbModal) { }

  changeData(item:data.email) {
    const getId = this.emailFilter.filter((x) => x.id == item.id);
    this.selectedId = getId[0].id;
    this.emailFilter.filter(data =>{
      if(data.id == item.id){
          data.status = true;
      } else{
        data.status = false;
      }
     })
  }

  openEmail(){
    this.modal.open(ComposeEmailComponent , { size : 'lg' });
  }

  addLabel(){
    this.modal.open(AddLabelComponent, { size : 'lg' });
  }

  Outside(){
    this.isOpen = false;  
   }
   
}
