import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LOCAL_STORAGE_KEY, USE_BASE64_ENCODING } from '../../../corepcode/store/state-provider';
import { BaseShellDirective } from '@pcode/ui/base-shell/base-shell.components';


@Component({
  standalone: true,
  selector: 'app-tipocategoria-shell',
  imports: [CommonModule, RouterModule],
  template: `<router-outlet></router-outlet>`,
  providers: [
    { provide: LOCAL_STORAGE_KEY, useValue: 'ui-TipocategoriaShellComponent' },
    { provide: USE_BASE64_ENCODING, useValue: false } 
  ]
})
 
export class TipocategoriaShellComponent extends BaseShellDirective {
  readonly rootKey = 'ui-TipocategoriaShellComponent';

}
