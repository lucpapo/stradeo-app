import { Component } from '@angular/core';
import { AdditionalContentComponent } from './additional-content/additional-content.component';
import { LeftBorderAlertComponent } from './left-border-alert/left-border-alert.component';
import { LiveAlertComponent } from './live-alert/live-alert.component';
import { DismissingLightAlertsComponent } from './dismissing-light-alerts/dismissing-light-alerts.component';
import { DismissingDarkAlertsComponent } from './dismissing-dark-alerts/dismissing-dark-alerts.component';
import { AlertsIconsTextActionsComponent } from './alerts-icons-text-actions/alerts-icons-text-actions.component';
import { OutlineDarkLightAlertsComponent } from './outline-dark-light-alerts/outline-dark-light-alerts.component';
import { LinkColorLightThemeComponent } from './link-color-light-theme/link-color-light-theme.component';
import { LinkColorDarkThemeComponent } from './link-color-dark-theme/link-color-dark-theme.component';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    standalone: true,
    imports: [LinkColorDarkThemeComponent, LinkColorLightThemeComponent, OutlineDarkLightAlertsComponent, AlertsIconsTextActionsComponent, DismissingDarkAlertsComponent, DismissingLightAlertsComponent, LiveAlertComponent, LeftBorderAlertComponent, AdditionalContentComponent]
})
export class AlertComponent {

}
