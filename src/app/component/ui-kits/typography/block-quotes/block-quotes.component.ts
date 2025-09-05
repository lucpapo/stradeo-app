import { Component } from '@angular/core';
import { blockQuotes } from '../../../../shared/data/data/ui-kits/typogaraphy';

@Component({
    selector: 'app-block-quotes',
    templateUrl: './block-quotes.component.html',
    styleUrls: ['./block-quotes.component.scss'],
    standalone: true
})
export class BlockQuotesComponent {

  public blockquote = blockQuotes;

}
