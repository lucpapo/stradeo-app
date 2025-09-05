import { Component } from '@angular/core';
import { ScrollableListsComponent } from './scrollable-lists/scrollable-lists.component';
import { DisabledListsComponent } from './disabled-lists/disabled-lists.component';
import { NumberBadgeListsComponent } from './number-badge-lists/number-badge-lists.component';
import { JavaScriptBehaviorComponent } from './java-script-behavior/java-script-behavior.component';
import { ListNumbersComponent } from './list-numbers/list-numbers.component';
import { ListRadiosComponent } from './list-radios/list-radios.component';
import { ListCheckboxComponent } from './list-checkbox/list-checkbox.component';
import { CustomContentListsComponent } from './custom-content-lists/custom-content-lists.component';
import { HorizontalListsComponent } from './horizontal-lists/horizontal-lists.component';
import { ContextualClassesComponent } from './contextual-classes/contextual-classes.component';
import { FlushListsComponent } from './flush-lists/flush-lists.component';
import { ActiveListsComponent } from './active-lists/active-lists.component';
import { DefaultListsComponent } from './default-lists/default-lists.component';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss'],
    standalone: true,
    imports: [DefaultListsComponent, ActiveListsComponent, FlushListsComponent, ContextualClassesComponent, HorizontalListsComponent, CustomContentListsComponent, ListCheckboxComponent, ListRadiosComponent, ListNumbersComponent, JavaScriptBehaviorComponent, NumberBadgeListsComponent, DisabledListsComponent, ScrollableListsComponent]
})
export class ListsComponent {

}
