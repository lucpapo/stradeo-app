// src/app/features/configuracoes/routes.ts
import { Routes } from '@angular/router';
import { TipocategoriaShellComponent } from './tipocategoria/tipocategoria-shell.component';
import { TipocategoriaSRShellComponent } from './tipocategoriaSR/tipocategoriaSR-shell.component';
 
export const CONFIGURACOES_ROUTES: Routes = [
  {
    path: 'tipocategoria',
    component: TipocategoriaShellComponent, // contém <router-outlet/>
    loadChildren: () =>
      import('./tipocategoria/routes').then(m => m.TIPOCATEGORIA_ROUTES),
  },
  {
    path: 'tipocategoriaSR',
    component: TipocategoriaSRShellComponent, // contém <router-outlet/>
    loadChildren: () =>
      import('./tipocategoriaSR/routes').then(m => m.TIPOCATEGORIASR_ROUTES),
  },
  
  // Redirect padrão
  { path: '', pathMatch: 'full', redirectTo: 'tipocategoria' },
];
