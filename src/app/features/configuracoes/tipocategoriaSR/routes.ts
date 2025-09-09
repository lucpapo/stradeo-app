import { Routes } from '@angular/router';

export const TIPOCATEGORIASR_ROUTES: Routes = [
  {
    // Rota para a lista (ex: /configuracoes/tipocategoriaSR)
    path: '',
    title: 'Tipo de Categoria Sem Rota',
    loadComponent: () =>
      import('./crud/search/list/tipocategoriaSR-list.page')
        .then(m => m.TipocategoriaSRListPage),
    data: {
      title: 'Tipo de Categoria Sem Rota',
      breadcrumb: 'Tipo de Categoria Sem Rota'
    }
  },
  {
    // Rota para CRIAR um novo registo (ex: /configuracoes/tipocategoriaSR/novo)
    path: 'novo',
    title: 'Novo Tipo de Categoria Sem Rota',
    loadComponent: () =>
      import('./crud/view/tipocategoriaSR-detail.page')
        .then(m => m.TipocategoriaSRDetailPage),
    data: {
      title: 'Novo Tipo de Categoria Sem Rota',
      breadcrumb: 'Novo'
    }
  },
  {
    // Rota para VISUALIZAR um registo existente (ex: /configuracoes/tipocategoriaSR/123/view)
    path: ':id/view',
    title: 'Visualizar Tipo de Categoria Sem Rota',
    loadComponent: () =>
      import('./crud/view/tipocategoriaSR-detail.page')
        .then(m => m.TipocategoriaSRDetailPage),
    data: {
      title: 'Visualizar Tipo de Categoria Sem Rota',
      breadcrumb: 'Visualizar'
    }
  },
  {
    // Rota para ATUALIZAR um registo existente (ex: /configuracoes/tipocategoriaSR/123/edit)
    path: ':id/edit',
    title: 'Editar Tipo de Categoria Sem Rota',
    loadComponent: () =>
      import('./crud/view/tipocategoriaSR-detail.page')
        .then(m => m.TipocategoriaSRDetailPage),
    data: {
      title: 'Editar Tipo de Categoria Sem Rota',
      breadcrumb: 'Editar'
    }
  },
];