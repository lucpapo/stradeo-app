// src/app/features/configuracoes/routes.ts
import { Routes } from '@angular/router';
import { ConfiguracoesShellComponent } from './configuracoes-shell.component';
    
export const CONFIGURACOES_ROUTES: Routes = [
  {
    path: '',
    component: ConfiguracoesShellComponent, // contém <router-outlet/>
    children: [
      {
        path: 'tipocategoria',
        loadChildren: () =>
          import('./tipocategoria/routes').then(m => m.TIPOCATEGORIA_ROUTES),
      },
      { path: '', pathMatch: 'full', redirectTo: 'tipocategoria' },
    ],
  },
];
