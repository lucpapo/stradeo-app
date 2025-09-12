// src/app/features/configuracoes/routes.ts
import { Routes } from '@angular/router';
import { TipocategoriaShellComponent } from './tipocategoria/tipocategoria-shell.component';
import { TipocategoriaSRShellComponent } from './tipocategoriaSR/tipocategoriaSR-shell.component';
import { CategoriaShellComponent } from './categoria/categoria-shell.component';
 
export const CONFIGURACOES_ROUTES: Routes = [
  {
    path: 'tipocategoria',
    component: TipocategoriaShellComponent, // contém <router-outlet/>
    loadChildren: () =>
      import('./tipocategoria/routes').then(m => m.TIPOCATEGORIA_ROUTES),
  },

    {
    path: 'categoria',
    component: CategoriaShellComponent, // contém <router-outlet/>
    loadChildren: () =>
      import('./categoria/categoriaroutes').then(m => m.CATEGORIA_ROUTES),
  },

   {
    path: 'tipocategoriaSR',
    component: TipocategoriaSRShellComponent, // contém <router-outlet/>
    loadChildren: () =>
      import('./tipocategoriaSR/routes').then(m => m.TIPOCATEGORIA_ROUTES),
  },
  
  { path: '', pathMatch: 'full', redirectTo: 'tipocategoria' },
];
