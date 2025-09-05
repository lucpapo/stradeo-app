import { Component } from '@angular/core';
import { ContactSideMenuComponent } from './contact-side-menu/contact-side-menu.component';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    standalone: true,
    imports: [ContactSideMenuComponent]
})

export class ContactsComponent {

}
