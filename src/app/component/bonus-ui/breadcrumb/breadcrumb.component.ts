import { Component } from '@angular/core';
import { ColoredBreadcrumbComponent } from './colored-breadcrumb/colored-breadcrumb.component';
import { VariationBreadcrumbComponent } from './variation-breadcrumb/variation-breadcrumb.component';
import { IconsBreadcrumbComponent } from './icons-breadcrumb/icons-breadcrumb.component';
import { DividerBreadcrumbComponent } from './divider-breadcrumb/divider-breadcrumb.component';
import { DefaultBreadcrumbComponent } from './default-breadcrumb/default-breadcrumb.component';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    standalone: true,
    imports: [DefaultBreadcrumbComponent, DividerBreadcrumbComponent, IconsBreadcrumbComponent, VariationBreadcrumbComponent, ColoredBreadcrumbComponent]
})
export class BreadcrumbComponent {

}
