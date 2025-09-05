import { Component } from '@angular/core';
import { BorderTabsComponent } from './border-tabs/border-tabs.component';
import { MaterialStyleTabsComponent } from './material-style-tabs/material-style-tabs.component';
import { MaterialStyleLeftTabsComponent } from './material-style-left-tabs/material-style-left-tabs.component';
import { JustifyTabsComponent } from './justify-tabs/justify-tabs.component';
import { PillsTabsComponent } from './pills-tabs/pills-tabs.component';
import { VerticalTabsComponent } from './vertical-tabs/vertical-tabs.component';
import { IconsTabsComponent } from './icons-tabs/icons-tabs.component';
import { SimpleTabsComponent } from './simple-tabs/simple-tabs.component';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    standalone: true,
    imports: [SimpleTabsComponent, IconsTabsComponent, VerticalTabsComponent, PillsTabsComponent, JustifyTabsComponent, MaterialStyleLeftTabsComponent, MaterialStyleTabsComponent, BorderTabsComponent]
})
export class TabsComponent {

}
