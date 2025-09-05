import { Component } from '@angular/core';
import { projectData } from '../../../../shared/data/data/user/users-edit';

@Component({
    selector: 'app-add-projects-upload',
    templateUrl: './add-projects-upload.component.html',
    styleUrls: ['./add-projects-upload.component.scss'],
    standalone: true
})
export class AddProjectsUploadComponent {

  public projectItem = projectData;

}
