import { Component } from '@angular/core';
import { AjaxRequestMovieComponent } from './ajax-request-movie/ajax-request-movie.component';
import { AutoCloseTimerComponent } from './auto-close-timer/auto-close-timer.component';
import { WarningModeComponent } from './warning-mode/warning-mode.component';
import { DangerAlertComponent } from './danger-alert/danger-alert.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { UsernameAlertComponent } from './username-alert/username-alert.component';
import { QuestionsAlertComponent } from './questions-alert/questions-alert.component';
import { PikachuAlertComponent } from './pikachu-alert/pikachu-alert.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { InfoAlertComponent } from './info-alert/info-alert.component';
import { TitleTextAlertComponent } from './title-text-alert/title-text-alert.component';
import { BasicExampleComponent } from './basic-example/basic-example.component';

@Component({
    selector: 'app-sweet-alert-two',
    templateUrl: './sweet-alert-two.component.html',
    styleUrls: ['./sweet-alert-two.component.scss'],
    standalone: true,
    imports: [BasicExampleComponent, TitleTextAlertComponent, InfoAlertComponent, WarningAlertComponent, PikachuAlertComponent, QuestionsAlertComponent, UsernameAlertComponent, SuccessAlertComponent, DangerAlertComponent, WarningModeComponent, AutoCloseTimerComponent, AjaxRequestMovieComponent]
})
export class SweetAlertTwoComponent {

}
