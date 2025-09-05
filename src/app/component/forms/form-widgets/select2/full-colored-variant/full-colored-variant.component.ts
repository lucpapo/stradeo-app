import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-full-colored-variant',
    templateUrl: './full-colored-variant.component.html',
    styleUrls: ['./full-colored-variant.component.scss'],
    standalone: true,
    imports: [FormsModule, TitleCasePipe]
})
export class FullColoredVariantComponent {

  colors = ["primary", "secondary", "success", "info", "warning", "danger", "inverse"]

}
