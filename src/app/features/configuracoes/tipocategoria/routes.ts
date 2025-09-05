// src/app/features/configuracoes/tipocategoria/routes.ts
import { Routes } from '@angular/router';
import { TipocategoriaShellComponent } from './tipocategoria-shell.component';
 
export const TIPOCATEGORIA_ROUTES: Routes = [
  {
    path: '',
    component: TipocategoriaShellComponent, // contém <router-outlet/>
    children: [
      {
        path: '',
        title: 'Tipo de Categoria',
        // lista inicial (lazy de componente)
        loadComponent: () =>
          import('./crud/search/list/tipocategoria-list.page')
            .then(m => m.TipocategoriaListPage),
      },
      // {
      //   path: 'novo',
      //   loadComponent: () =>
      //     import('./crud/view/tipocategoria-view.page')
      //       .then(m => m.TipocategoriaViewPage),
      // },
      // {
      //   path: ':id',
      //   loadComponent: () =>
      //     import('./crud/view/tipocategoria-view.page')
      //       .then(m => m.TipocategoriaViewPage),
      // },
      // {
      //   path: ':id/editar',
      //   loadComponent: () =>
      //     import('./crud/view/tipocategoria-view.page')
      //       .then(m => m.TipocategoriaViewPage),
      // },
    ],
  },
];
