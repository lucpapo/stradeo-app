import { Routes } from "@angular/router";
import { DefaultComponent } from "./default/default.component";
import { EcommerceComponent } from "./ecommerce/ecommerce.component";

export default [
    {
        path: 'default',
        component: DefaultComponent,
        data: {
            title: 'Default dashboard',
            breadcrumb: 'Default'
        }
    },
    {
        path: 'ecommerce',
        component: EcommerceComponent,
        data: {
            title: 'E-Commerce Dashboard',
            breadcrumb: 'E-Commerce'
        }
    },
] as Routes;