import { Routes } from "@angular/router";
import { Invoice1Component } from "../../component/main-ecommerce/invoice/invoice1/invoice1.component";
import { Invoice2Component } from "../../component/main-ecommerce/invoice/invoice2/invoice2.component";
import { Invoice3Component } from "../../component/main-ecommerce/invoice/invoice3/invoice3.component";
import { Invoice4Component } from "../../component/main-ecommerce/invoice/invoice4/invoice4.component";
import { Invoice5Component } from "../../component/main-ecommerce/invoice/invoice5/invoice5.component";

export const full: Routes = [
    {
        path: 'error-page',
        loadChildren: () => import('../../pages/error-pages/error-pages.routes')
    },
    {
        path: 'authentication',
        loadChildren: () => import('../../pages/authentication/authentication.routes')
    },
    {
        path: 'coming-soon',
        loadChildren: () => import('../../pages/coming-soon/coming-soon.routes')
    },
    {
        path: 'ecommerce/invoice/invoice-1',
        component: Invoice1Component,
      },
      {
        path: 'ecommerce/invoice/invoice-2',
        component: Invoice2Component,
      },
      {
        path: 'ecommerce/invoice/invoice-3',
        component: Invoice3Component,
      },
      {
        path: 'ecommerce/invoice/invoice-4',
        component: Invoice4Component,
      },
      {
        path: 'ecommerce/invoice/invoice-5',
        component: Invoice5Component,
      },
]   