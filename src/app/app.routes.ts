import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { Error400Component } from './pages/error-pages/error400/error400.component';
import { ContentComponent } from './shared/component/layout/content/content.component';
import { FullComponent } from './shared/component/layout/full/full.component';
import { AdminGuard } from './shared/guard/admin.guard';
import { full } from './shared/routes/full-routes';
import { content } from './shared/routes/routes';
import { RegisterSimpleComponent } from './pages/authentication/register-simple/register-simple.component';
import { ForgetPasswordComponent } from './pages/authentication/forget-password/forget-password.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
    },
    {
        path: 'offcanvas-test',
        loadComponent: () => 
          import('./shared/components/offcanvas-container/offcanvas-test-page.component')
            .then(m => m.OffcanvasTestPageComponent)
      },

    { path: '', pathMatch: 'full', redirectTo: 'tipocategoria' },
    
    {
        path: 'offcanvas-test',
        loadComponent: () => 
            import('./shared/components/offcanvas-container/offcanvas-test-page.component')
                .then(m => m.OffcanvasTestPageComponent)
    },
    {
        path: 'table-simulation',
        loadComponent: () => 
            import('./shared/components/offcanvas-container/clean-table-page.component')
                .then(m => m.CleanTablePageComponent)
    },
    {
        path: 'backdrop-test',
        loadComponent: () => 
            import('./shared/components/offcanvas-container/backdrop-test.component')
                .then(m => m.BackdropTestComponent)
    },

    {
        path: 'configuracoes',
         component: ContentComponent,
        loadChildren: () =>
            import('./features/configuracoes/routes').then(m => m.CONFIGURACOES_ROUTES),
    },


    {
        path: 'auth/login',
        component: LoginComponent,
    },
    {
        path: 'auth/register',
        component: RegisterSimpleComponent
    },
    {
        path: 'auth/forget-password',
        component: ForgetPasswordComponent
    },
    {
        path: '',
        component: ContentComponent,
      //canActivate: [AdminGuard],
        children: content
    },
    {
        path: '',
        component: FullComponent,
       // canActivate: [AdminGuard],
        children: full
    },
    { path: '**', component: Error400Component }
];
