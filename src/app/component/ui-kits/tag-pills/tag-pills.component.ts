import { Component } from '@angular/core';
import * as  data from '../../../shared/data/data/ui-kits/tag-pills';
import { BadgePartButtonsComponent } from './badge-part-buttons/badge-part-buttons.component';
import { BadgeHeadingComponent } from './badge-heading/badge-heading.component';
import { CommonBadgePillsComponent } from './common-badge-pills/common-badge-pills.component';

@Component({
    selector: 'app-tag-pills',
    templateUrl: './tag-pills.component.html',
    styleUrls: ['./tag-pills.component.scss'],
    standalone: true,
    imports: [CommonBadgePillsComponent, BadgeHeadingComponent, BadgePartButtonsComponent]
})
export class TagPillsComponent {

  public BadgesData = data.buttons;
  public PillsData = data.pills;
  public NumberBadgeData = data.numberBadge;
  public NumberPillsData = data.numberPillsTag;
  public IconBadeData = data.iconBadge;
  public IconPillsData = data.iconPills;

}
