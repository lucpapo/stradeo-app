import { Routes } from '@angular/router';
import { CategoriaShellComponent } from './categoria-shell.component';
export const CATEGORIA_ROUTES: Routes = [
    {
        path: '',
        component: CategoriaShellComponent, // Componente shell que contém <router-outlet/>
    children: [
        {
            // Rota para a lista (ex: /configuracoes/categoria)
            path: '',
            title: 'Categoria',
            loadComponent: () =>
                import('./crud/search/list/categoria-list.page')
                    .then(m => m.CategoriaListPage),
        data: {
            title: 'Categoria',
            breadcrumb: 'Categoria'
        }
},
        {
            // Rota para CRIAR um novo registo (ex: /configuracoes/categoria/novo)
            path: 'novo',
            title: 'Novo Categoria',
            loadComponent: () =>
                import('./crud/view/categoria-detail.page')
                    .then(m => m.CategoriaDetailPage),
        data: {
            title: 'Novo Categoria',
            breadcrumb: 'Categoria'
        }
},
        {
            // Rota para VISUALIZAR um registo existente (ex: /configuracoes/categoria/:id/view)
            path: ':id/view',
            title: 'Visualizar Categoria',
            loadComponent: () =>
                import('./crud/view/categoria-detail.page')
                    .then(m => m.CategoriaDetailPage),
        data: {
            title: 'Visualizar Categoria',
            breadcrumb: 'Categoria'
        }
},
        {
            // Rota para ATUALIZAR um registo existente (ex: /configuracoes/categoria/:id/edit)
            path: ':id/edit',
            title: 'Editar Categoria',
            loadComponent: () =>
                import('./crud/view/categoria-detail.page')
                    .then(m => m.CategoriaDetailPage),
        data: {
            title: 'Editar Categoria',
            breadcrumb: 'Categoria'
        }
},
    ],
},
];