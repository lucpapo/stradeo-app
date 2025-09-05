import { Component } from '@angular/core';
import { GlobalConfigurationComponent } from './global-configuration/global-configuration.component';
import { PreventManualEntryComponent } from './prevent-manual-entry/prevent-manual-entry.component';
import { TemplateForResultsComponent } from './template-for-results/template-for-results.component';
import { SelectOnExactComponent } from './select-on-exact/select-on-exact.component';
import { FormattedResultsComponent } from './formatted-results/formatted-results.component';
import { OpenFocusTypeAheadComponent } from './open-focus-type-ahead/open-focus-type-ahead.component';
import { WikipediaSearchComponent } from './wikipedia-search/wikipedia-search.component';
import { SimpleTypeAheadComponent } from './simple-type-ahead/simple-type-ahead.component';

@Component({
    selector: 'app-type-ahead',
    templateUrl: './type-ahead.component.html',
    styleUrls: ['./type-ahead.component.scss'],
    standalone: true,
    imports: [SimpleTypeAheadComponent, WikipediaSearchComponent, OpenFocusTypeAheadComponent, FormattedResultsComponent, SelectOnExactComponent, TemplateForResultsComponent, PreventManualEntryComponent, GlobalConfigurationComponent]
})
export class TypeAheadComponent {

}
