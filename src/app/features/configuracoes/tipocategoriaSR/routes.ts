import { Routes } from '@angular/router';
import { TipocategoriaSRShellComponent } from './tipocategoriaSR-shell.component';
 
export const TIPOCATEGORIA_ROUTES: Routes = [
  {
    path: '',
    component: TipocategoriaSRShellComponent, // O seu componente shell que contém <router-outlet/>
    children: [
      {
        // Rota para a lista (ex: /configuracoes/tipocategoria)
        path: '',
        title: 'Tipo de Categoria',
        loadComponent: () =>
          import('./crud/search/list/tipocategoriaSR-list.page')
            .then(m => m.TipocategoriaListSRPage),
             data: {title: 'Tipo de Categoria',
            breadcrumb: 'Tipo de Categoria'
        }
      },
      {
        // Rota para CRIAR um novo registo (ex: /configuracoes/tipocategoria/novo)
        path: 'novo',
        title: 'Novo Tipo de Categoria',
        loadComponent: () =>
          import('./crud/view/tipocategoriaSR-detail.page')
            .then(m => m.TipocategoriaSRDetailPage),
               data: {title: 'Novo Tipo de Categoria',
            breadcrumb: 'Tipo de Categoria'
        }
      },
     {
        // Rota para VISUALIZAR um registo existente (ex: /configuracoes/tipocategoria/123/view)
        path: ':id/view',
        title: 'Visualizar Tipo de Categoria',
        loadComponent: () =>
          import('./crud/view/tipocategoriaSR-detail.page')
            .then(m => m.TipocategoriaSRDetailPage),
                data: {title: 'Tipo de Categoria',
            breadcrumb: 'Tipo de Categoria'
        }
      },
      {
        // Rota para ATUALIZAR um registo existente (ex: /configuracoes/tipocategoria/123/edit)
        path: ':id/edit',
        title: 'Editar Tipo de Categoria',
        loadComponent: () =>
          import('./crud/view/tipocategoriaSR-detail.page')
            .then(m => m.TipocategoriaSRDetailPage),
              data: {title: 'Tipo de Categoria',
            breadcrumb: 'Tipo de Categoria'
        }
      }, 
    ],
  },
];

