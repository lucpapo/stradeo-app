import { Component } from '@angular/core';
import { DropdownSizingComponent } from './dropdown-sizing/dropdown-sizing.component';
import { DividerDropdownComponent } from './divider-dropdown/divider-dropdown.component';
import { HelperCardComponent } from './helper-card/helper-card.component';
import { AlignmentsComponent } from './alignments/alignments.component';
import { JustifyContentsComponent } from './justify-contents/justify-contents.component';
import { UniqueDropdownComponent } from './unique-dropdown/unique-dropdown.component';
import { DarkDropdownComponent } from './dark-dropdown/dark-dropdown.component';
import { InputTypeDropdownComponent } from './input-type-dropdown/input-type-dropdown.component';
import { HeadingDropdownComponent } from './heading-dropdown/heading-dropdown.component';
import { SplitDropdownComponent } from './split-dropdown/split-dropdown.component';
import { RoundedDropdownComponent } from './rounded-dropdown/rounded-dropdown.component';
import { BasicDropdownComponent } from './basic-dropdown/basic-dropdown.component';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    standalone: true,
    imports: [BasicDropdownComponent, RoundedDropdownComponent, SplitDropdownComponent, HeadingDropdownComponent, InputTypeDropdownComponent, DarkDropdownComponent, UniqueDropdownComponent, JustifyContentsComponent, AlignmentsComponent, HelperCardComponent, DividerDropdownComponent, DropdownSizingComponent]
})
export class DropdownComponent {

}
