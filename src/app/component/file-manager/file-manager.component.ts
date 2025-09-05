import { Component } from '@angular/core';
import { FileItemComponent } from './file-item/file-item.component';
import { FileManagerSidebarComponent } from './file-manager-sidebar/file-manager-sidebar.component';

@Component({
    selector: 'app-file-manager',
    templateUrl: './file-manager.component.html',
    styleUrls: ['./file-manager.component.scss'],
    standalone: true,
    imports: [FileManagerSidebarComponent, FileItemComponent]
})
export class FileManagerComponent {

}
