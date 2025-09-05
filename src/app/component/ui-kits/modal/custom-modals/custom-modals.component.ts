import { Component } from '@angular/core';
import { BalanceModalComponent } from './balance-modal/balance-modal.component';
import { ResultModalComponent } from './result-modal/result-modal.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';

@Component({
    selector: 'app-custom-modals',
    templateUrl: './custom-modals.component.html',
    styleUrls: ['./custom-modals.component.scss'],
    standalone: true,
    imports: [ProfileModalComponent, ResultModalComponent, BalanceModalComponent]
})
export class CustomModalsComponent {

}
