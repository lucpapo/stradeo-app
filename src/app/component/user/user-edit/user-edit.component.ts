import { Component } from '@angular/core';
import { AddProjectsUploadComponent } from './add-projects-upload/add-projects-upload.component';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
    standalone: true,
    imports: [MyProfileComponent, EditProfileFormComponent, AddProjectsUploadComponent]
})
export class UserEditComponent {

}
