import { Component } from '@angular/core';
import { FeatherIconComponent } from '../../../shared/component/header/feather-icon/feather-icon.component';
import * as fileData from '../../../shared/data/data/file-manager';

@Component({
    selector: 'app-file-item',
    templateUrl: './file-item.component.html',
    styleUrls: ['./file-item.component.scss'],
    standalone: true,
    imports: [FeatherIconComponent]
})
export class FileItemComponent {

  public active = 1;
  public quickData = fileData.quickData
  public FoldersData = fileData.FoldersData
  public FilesData = fileData.FilesData

}
