import { Routes } from '@angular/router';

export const TIPOCATEGORIASR_ROUTES: Routes = [
  {
    // Rota para a lista (ex: /configuracoes/tipocategoriaSR)
    path: '',
    title: 'Tipo de Categoria Sem Rota',
    loadComponent: () =>
      import('./tipocategoria-container.component')
        .then(m => m.TipocategoriaContainer),
    data: {
      title: 'Tipo de Categoria Sem Rota',
      breadcrumb: 'Tipo de Categoria Sem Rota'
    }
  }

];