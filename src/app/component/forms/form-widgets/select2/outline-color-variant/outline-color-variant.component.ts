import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-outline-color-variant',
    templateUrl: './outline-color-variant.component.html',
    styleUrls: ['./outline-color-variant.component.scss'],
    standalone: true,
    imports: [FormsModule, TitleCasePipe]
})
export class OutlineColorVariantComponent {

  colors = ["primary", "secondary", "success", "info", "warning", "danger", "inverse"]


}
