import { Component } from '@angular/core';
import { ApplyFormComponent } from './apply-form/apply-form.component';
import { JobFilterComponent } from '../job-filter/job-filter.component';

@Component({
    selector: 'app-apply',
    templateUrl: './apply.component.html',
    styleUrls: ['./apply.component.scss'],
    standalone: true,
    imports: [JobFilterComponent, ApplyFormComponent]
})
export class ApplyComponent {

}
