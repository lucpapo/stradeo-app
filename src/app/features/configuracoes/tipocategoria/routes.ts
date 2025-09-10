import { Routes } from '@angular/router';
 
export const TIPOCATEGORIA_ROUTES: Routes = [
  {
    // Rota para a lista (ex: /configuracoes/tipocategoria)
    path: '',
    loadComponent: () =>
      import('./crud/search/list/tipocategoria-list.page')
        .then(m => m.TipocategoriaListPage),
    data: {
      title: 'Tipo de Categoria',
      breadcrumb: 'Tipo de Categoria'
    }
  },
  {
    // Rota para novo registro
    path: 'novo',
    loadComponent: () =>
      import('./crud/view/tipocategoria-detail.page')
        .then(m => m.TipocategoriaDetailPage),
    data: {
      title: 'Novo Tipo de Categoria',
      breadcrumb: 'Novo'
    }
  },
  {
    // Rota para editar registro
    path: ':id/edit',
    loadComponent: () =>
      import('./crud/view/tipocategoria-detail.page')
        .then(m => m.TipocategoriaDetailPage),
    data: {
      title: 'Editar Tipo de Categoria',
      breadcrumb: 'Editar'
    }
  },
  {
    // Rota para visualizar registro
    path: ':id/view',
    loadComponent: () =>
      import('./crud/view/tipocategoria-detail.page')
        .then(m => m.TipocategoriaDetailPage),
    data: {
      title: 'Visualizar Tipo de Categoria',
      breadcrumb: 'Visualizar'
    }
  }
];

