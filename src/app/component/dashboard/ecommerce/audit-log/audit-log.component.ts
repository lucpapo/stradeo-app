import { Component } from '@angular/core';
import { DropdownComponent } from "../../../../shared/component/dropdown/dropdown.component";
import * as data from  '../../../../shared/data/data/dashboard';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [DropdownComponent,RouterModule],
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.scss'
})

export class AuditLogComponent {

  public dropdownList: string[] = ['Weekly', 'Monthly', 'Yearly'];
   public data = data.auditLog;
}
