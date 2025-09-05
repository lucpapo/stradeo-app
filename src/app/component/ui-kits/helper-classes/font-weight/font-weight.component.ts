import { Component } from '@angular/core';
import { FontWight } from '../../../../shared/data/data/ui-kits/helper-classes';


@Component({
  selector: 'app-font-weight',
  templateUrl: './font-weight.component.html',
  styleUrls: ['./font-weight.component.scss']
})
export class FontWeightComponent {

  public fontWeightData = FontWight;

}
