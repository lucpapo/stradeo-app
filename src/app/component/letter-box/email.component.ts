import { Component } from '@angular/core';
import { EmailLeftAsideComponent } from './email-left-aside/email-left-aside.component';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss'],
    standalone: true,
    imports: [EmailLeftAsideComponent]
})

export class EmailComponent {

}
