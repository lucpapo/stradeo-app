import { Component } from '@angular/core';
import { becomeMember } from '../../../../shared/data/data/main-ecommerce/pricing';

@Component({
    selector: 'app-become-member',
    templateUrl: './become-member.component.html',
    styleUrls: ['./become-member.component.scss'],
    standalone: true
})
export class BecomeMemberComponent {

  public becomeMemberData = becomeMember;

}
