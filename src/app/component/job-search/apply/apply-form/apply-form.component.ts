import { Component } from '@angular/core';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { YourExperienceComponent } from './your-experience/your-experience.component';
import { YourEductionComponent } from './your-eduction/your-eduction.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';

@Component({
    selector: 'app-apply-form',
    templateUrl: './apply-form.component.html',
    styleUrls: ['./apply-form.component.scss'],
    standalone: true,
    imports: [PersonalDetailsComponent, YourEductionComponent, YourExperienceComponent, UploadFilesComponent]
})
export class ApplyFormComponent {

}
