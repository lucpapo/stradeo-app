import { Component } from '@angular/core';
import { allIcon } from '../../../shared/data/data/icons/thimify';

@Component({
    selector: 'app-ico-icon',
    templateUrl: './ico-icon.component.html',
    styleUrls: ['./ico-icon.component.scss'],
    standalone: true
})
export class IcoIconComponent {

  public detail: boolean = false;
  public icon: string;
  public val: string;
  public allIconData = allIcon.ico

  toggleWithInfo(icon: string) {
    this.detail = true;
    this.icon = icon;
    this.val = '<i class="icofont icofont-' + icon + '"></i>';
  }

  // copy text
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = '<i class="icofont icofont-' + val + '"></i>';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
